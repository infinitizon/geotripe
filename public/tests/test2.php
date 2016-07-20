<?php
/**
 * Created by IntelliJ IDEA.
 * User: ahassan
 * Date: 7/19/16
 * Time: 1:58 PM
 */// This just maps what fields are in what tables
$tableName = array(
    'contacts' => array(
        'account_id' => true, /* or an array of information such as SQL type, etc. */
        'first_name' => true
    ),
    'accounts' => array(
        'account_id' => true, /* or an array of information such as SQL type, etc. */
        'Name' => true
    )
);

// This maps all the JOINs
$orm = array(
    'contacts' => array(
        'accounts' => array(
            'on'    => array( 'account_id', 'account_id' ),
            'type'  => 'LEFT JOIN', //
        )
    )
);

$selectedFields = array('account_id','first_name');
$selectedTables = array('contacts','accounts');
$unresolvedFields =$selectedFields;
while (!empty($unresolvedFields)) {
    $changes = false;
    // Try to resolve one of them.
    foreach ($unresolvedFields as $i => $field) {
        // Try to resolve it.
        list($tableName, $fieldName) = explode('.', $field);

        // Did we already select from this table?
        if (array_key_exists($tableName, $selectedTables)) {
            // Yes, so this field has been resolved for free.
            $changes = true;
            $resolvedFields[] = $field;
            array_push($selectedTables[$tableName], $fieldName);
            unset($unresolvedFields[$i]);
            // On to the next field.
            continue;
        }
        // This is the first time we see this table.
        // Is this the VERY FIRST table (assume it's the "lead" table --
        // it's not necessary but it simplifies the code)?
        if (empty($selectedTables)) {
            // Yes. We need do no more.
            $selectedTables[$tableName] = array( $fieldName );
            $changes = true; //-//
            $resolvedFields[] = $field; //-//
            unset($unresolvedFields[$i]); //-//
            // On to the next field. //--//
            continue; //--//
        } // We could also put this check before the last. If we did, the
        // lines above marked //-// could be left out; those with //--// should.
        // And we would need $selectedTables[$tableName] = array(/*EMPTY*/);

        // We did not see this table before, and it's not the first.
        // So we need a way to join THIS table with SOME of those already used.

        // Again we suppose there're no ambiguities here. This table HAS a
        // link to some other. So we just need ask, "WHICH other? And do we have it?"
        $links = $orm[$tableName];

        $useful = array_intersect_keys($orm[$tableName], $selectedTables);

        // $useful contains an entry 'someTable' => ( 'on' => ... )
        // for each table that we can use to reference $tableName.
        // THERE MUST BE ONLY ONE, or there will be an ambiguity.
        // Of course most of the time we will find none.
        // And go on with the next field...
        if (empty($useful)) {
            continue;
        }
        // TODO: check count($useful) is really 1.
        $changes = true;
        $selectedTables[$tableName] = array( $fieldName );
        list($joinWith, $info) = each($useful[0]);
        // We write SQL directly in here. We actually shouldn't, but it's faster
        // to do it now instead of saving the necessary info.
        // $info could actually also contain the JOIN type, additional conditions...
        $joins[] = "INNER JOIN {$joinWith} ON ( {$tableName}.{$info['on'][0]}
                      = {$joinWith}.{$info['on'][1]} )";
        unset($unresolvedFields[$i]);
    }
    // If something changed, we need to repeat, because a later field could have
    // supplied some table that could have made joinable an earlier field which we
    // had given up on, before.
    if (!$changes) {
        // But if nothing has changed there's no purpose in continuing.
        // Either we resolved all the fields or we didn't.
        break;
    }
}
// Now, if there're still unresolved fields after the situation stabilized,
// we can't make this query. Not enough information. Actually we COULD, but
// it would spew off a Cartesian product of the groups of unjoined tables -
// almost surely not what we wanted. So, unresolveds cause an error.
if (!empty($unresolvedFields)) {
    throw new \Exception("SOL");
}

// Else we can build the query: the first table leads the SELECT and all the
// others are joined.

$query = "SELECT " . implode(', ', $selectedFields)
    . ' FROM ' . array_shift($selectedTables) . "\n";
// Now for each $selectedTables remaining
echo $query;