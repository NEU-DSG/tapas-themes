<?php

/**
 * @file
 * template.php
 */

 function tapas_redesign_preprocess_region(&$variables, $hook) {
     if($variables['region'] == "toolbar"){
         $variables['classes_array'][] = 'toolbar';
     }
 }
