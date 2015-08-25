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


function tapas_redesign_process(&$variables, $hook) {
  if(in_array("toolbar", $variables['classes_array'])){
    if(user_is_logged_in()){
      $variables['content'] .= '<a class="collapsed toolbar-link" data-toggle="collapse" href="/user/logout" aria-expanded="false"><span class=" fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-sign-out fa-stack-1x fa-inverse"></i></span><span class="toolbar-title">Log out</span></a>';
    } else {
      $variables['content'] = '<a class="collapsed toolbar-link" data-toggle="collapse" href="/user" aria-expanded="false"><span class=" fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-sign-in fa-stack-1x fa-inverse"></i></span><span class="toolbar-title">Sign In</span></a>' . $variables['content'];
    }
  }
}
