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
var_dump($menu);
//echo _buildMenu(0, $menu);
echo _buildMenu3(0, $menu);
//var_dump( _buildMenu2(0, $menu));
function _buildMenu($parent, $menu) {
    $html = "";
    if (isset($menu['parents'][$parent])) {
        $html .= ($parent == 0) ? "<ul class=\"navigation\">\n" : "<ul>\n";
        foreach ($menu['parents'][$parent] as $itemId) {
            if(!isset($menu['parents'][$itemId])) {
                $html .= "<li>\n <a href='".$menu['items'][$itemId]['name']."'>".$menu['items'][$itemId]['name']."</a>\n</li> \n";
            }
            if(isset($menu['parents'][$itemId])) {
                $html .= "<li>\n <a href='".$menu['items'][$itemId]['name']."'>"
                    .(($parent == 0) ? "<span style=\"float:right;\">&nbsp;&nbsp; &#9661;</span>" : "<span style=\"float:right;\">&#9655;</span>")
                    .$menu['items'][$itemId]['name']."</a> \n";
                $html .= _buildMenu($itemId, $menu);
                $html .= "</li> \n";
            }
        }
        $html .= "</ul> \n";
    }
    return $html;
}
function _buildMenu3($parent, $menu) {
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
                $html .= '}';
                $html .= substr($html, strpos($html, "") + 1);
            }
            if(isset($menu['parents'][$itemId])) {
                $html .= "{";

                $html .= '"authview_id":"'.$menu['items'][$itemId]['authview_id'].'",';
                $html .= '"name":"'.$menu['items'][$itemId]['name'].'",';
                $html .= '"viewpath":"'.$menu['items'][$itemId]['viewpath'].'",';
                $html .= '"css_class":"'.$menu['items'][$itemId]['css_class'].'",';

                $html .= '"child":'._buildMenu3($itemId, $menu);
                $html .= "},";
            }
        }
        $html .= ($parent == 0) ? "]" : "";
    }
    return $html;
}

function _buildMenu2($parent, &$menu) {
    $html = array();
    if (isset($menu['parents'][$parent])) {
        foreach ($menu['parents'][$parent] as $itemId) {
//            ($parent != 0) ? $menu['items'][$itemId]['child'] = $menu['items'][$menu['parents'][$itemId][0]] : "";
            if(array_key_exists($itemId, $menu['parents'])){
//                $menu['items'][$itemId]
//                $menu['items'][$itemId]['child'] =

//                $child = array()
//                if(isset($menu['parents'][$itemId])) {
                echo "key exists -> ".$itemId."; child is ->".$menu['parents'][$itemId][0]."<br/>";
                $menu['items'][$itemId]['child'] = $menu['items'][$menu['parents'][$itemId][0]];
//                var_dump($menu);
                array_push($html, $menu['items'][$itemId]);
//                $menu['items'][$itemId]['child'] = $menu['items'][$menu['parents'][$itemId][0]];
                _buildMenu2($itemId, $menu);
//                array_push($html, $menu['items'][$itemId]);
//                }
            }
            if(!array_key_exists($itemId, $menu['parents'])){
                array_push($html, $menu['items'][$itemId]);
                echo "key not exists ->".$itemId."<br/>";
            }
        }
    }
    return $html;
}