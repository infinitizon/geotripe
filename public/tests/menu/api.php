<?php

include_once "core/init.inc.php";
$fxns = new Functions($dbo);
$result = $dbo->query("select av.authview_id, av.name, av.parent_id, av.viewpath, av.description, av.css_class from AuthView av");
// Create a multidimensional array to conatin a list of items and parents
$menu = array( 'items' => array(),  'parents' => array() );
// Builds the array lists with data from the menu table
while ($items = $result->fetch(PDO::FETCH_ASSOC)){
    // Creates entry into items array with current menu item id ie. $menu['items'][1]
    $menu['items'][$items['authview_id']] = $items;
    // Creates entry into parents array. Parents array contains a list of all items with children
    $menu['parents'][$items['parent_id']][] = $items['authview_id'];

}
echo _buildMenu(0, $menu);
function _buildMenu($parent, $menu) {
    $html = "";
    if (isset($menu['parents'][$parent])) {
        $html .= ($parent == 0) ? "[" : "";
        foreach ($menu['parents'][$parent] as $itemId) {
            if(!isset($menu['parents'][$itemId])) {
                $html .= '{';
                $html .= '"authview_id":"'.$menu['items'][$itemId]['authview_id'].'",';
                $html .= '"name":"'.$menu['items'][$itemId]['name'].'",';
                $html .= '"viewpath":"'.$menu['items'][$itemId]['viewpath'].'",';
                $html .= '"css_class":"'.$menu['items'][$itemId]['css_class'].'"';
                $html .= '},';
            }
            if(isset($menu['parents'][$itemId])) {
                $html .= "{";
                $html .= '"authview_id":"'.$menu['items'][$itemId]['authview_id'].'",';
                $html .= '"name":"'.$menu['items'][$itemId]['name'].'",';
                $html .= '"viewpath":"'.$menu['items'][$itemId]['viewpath'].'",';
                $html .= '"css_class":"'.$menu['items'][$itemId]['css_class'].'",';
                $html .= '"child":['._buildMenu($itemId, $menu);
                $html .= "]},";
            }
        }
        $html = (substr($html, -2)=='},') ? substr_replace($html ,"}",-2) : "";
        $html .= ($parent == 0) ? "]" : "";
    }
    return $html;
}
