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
  if(isset($variables['classes_array']) && in_array("toolbar", $variables['classes_array'])){
    if(user_is_logged_in()){
      $variables['content'] .= '<a class="toolbar-link" href="/user/logout" aria-expanded="false"><span class=" fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-sign-out fa-stack-1x fa-inverse"></i></span><span class="toolbar-title">Log out</span></a>';
    } else {
      $variables['content'] = '<a class="toolbar-link" href="/user" aria-expanded="false"><span class=" fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-sign-in fa-stack-1x fa-inverse"></i></span><span class="toolbar-title">Sign In</span></a>' . $variables['content'];
    }
  }
}

function tapas_redesign_form_search_block_form_alter(&$form, &$form_state, $form_id){
    $form['advanced'] = array(
      '#type' => 'fieldset',
      '#title' => t('Advanced search'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
      '#attributes' => array('class' => array('search-advanced')),
    );
    $form['advanced']['keywords'] = array(
      '#prefix' => '<div class="criterion">',
      '#suffix' => '</div>',
    );
    $form['advanced']['keywords']['or'] = array(
      '#type' => 'textfield',
      '#title' => t('Containing any of the words'),
      '#size' => 30,
      '#maxlength' => 255,
    );
    $form['advanced']['keywords']['phrase'] = array(
      '#type' => 'textfield',
      '#title' => t('Containing the phrase'),
      '#size' => 30,
      '#maxlength' => 255,
    );
    $form['advanced']['keywords']['negative'] = array(
      '#type' => 'textfield',
      '#title' => t('Containing none of the words'),
      '#size' => 30,
      '#maxlength' => 255,
    );

    // Node types:
    $types = array_map('check_plain', node_type_get_names());
    $form['advanced']['type'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Only of the type(s)'),
      '#prefix' => '<div class="criterion">',
      '#suffix' => '</div>',
      '#options' => $types,
    );
    $form['advanced']['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Advanced search'),
      '#prefix' => '<div class="action">',
      '#suffix' => '</div>',
      '#weight' => 100,
    );

    // Languages:
    $language_options = array();
    foreach (language_list('language') as $key => $entity) {
      if ($entity->enabled) {
        $language_options[$key] = $entity->name;
      }
    }
    if (count($language_options) > 1) {
      $form['advanced']['language'] = array(
        '#type' => 'checkboxes',
        '#title' => t('Languages'),
        '#prefix' => '<div class="criterion">',
        '#suffix' => '</div>',
        '#options' => $language_options,
      );
    }

    $form['#validate'][] = 'node_search_validate';
}


function tapas_redesign_preprocess_block(&$variables, $hook) {
  global $user;
  if ($variables['elements']['#block']->module == 'search' && $variables['elements']['#block']->region == 'content') {
    $variables['elements']['#block']->subject = NULL;
    $variables['classes_array'][] = "col-sm-9";
  }
  if ($variables['elements']['#block']->module == 'search' && $variables['elements']['#block']->region == 'toolbar') {
    $variables['content'] .= "<br/><a href='/search/node'>Advanced Search</a>";
  }
  if ($variables['elements']['#block']->module == 'menu' && $variables['elements']['#block']->region == 'toolbar'){
    $variables['content'] = '<ul class="menu nav"><li class="leaf"><a href="/user"><span class="fa fa-user"></span> My Account</a></li></ul>'.$variables['content'];
  }
  if ($variables['elements']['#block']->module == 'views' && $variables['elements']['#block']->delta == 'collections_in_project-block'){
    $node = menu_get_object();
    if (isset($node->nid)) {
      $nid = $node->nid;
    }
    if(isset($nid) && og_is_member('node', $nid, 'user', $user) == 1){
      $group_access = $node->group_access['und'][0]['value'];
      if ($group_access == 1){
        $group_access = "edit[group_access][und][1]=".$group_access."&disabled=".$group_access;
      } else {
        $group_access = "edit[group_access][und][0]=0&edit[group_access][und][1]=0&disabled=0";
      }
      $variables['elements']['#block']->subject .= "<a href='/node/add/tapas-collection?edit[og_tapas_c_to_p][und][0][default]=".$nid."&".$group_access."' class='pull-right h5'><span class='fa fa-plus'></span> Add New</a>";
      if (strpos($variables['content'],'view-empty') !== false) {
        $variables['content'] = '<div class="view view-collections-in-project view-id-collections_in_project view-display-id-block view-dom-id-'.$variables['elements']['#views_contextual_links_info']['views_ui']['view']->dom_id.'"><div class="view-empty">There are no collections yet in this project. <a href="/node/add/tapas-collection?edit[og_tapas_c_to_p][und][0][default]='.$nid.'&'.$group_access.'" class="btn btn-xs btn-default"> Add Collection</a>    </div></div>';
      }
    }
  }
  if ($variables['elements']['#block']->module == 'views' && $variables['elements']['#block']->delta == 'ece40a341bd3abd96179414c41afa18d'){
    $node = menu_get_object();
    if (isset($node->nid)) {
      $nid = $node->nid;
    }
    if(isset($nid) && og_is_member('node', $nid, 'user', $user) == 1){
      $variables['elements']['#block']->subject .= "<a href='/node/add/tapas-record?edit[og_tapas_r_to_c][und][0][default]=".$nid."' class='pull-right h5'><span class='fa fa-plus'></span> Add New</a>";
    }
  }
}

function tapas_redesign_preprocess_field(&$variables, $hook) {
  $field_name = $variables['element']['#field_name'];
  $view_mode = $variables['element']['#view_mode'];

  switch ($field_name) {
    case 'og_tapas_c_to_p':
      $variables['label'] = t('Project');
      break;
    case 'og_tapas_r_to_c':
      $variables['label'] = t('Collection');
      break;
    case 'group_group':
      if ($variables['element']['#bundle'] == 'tapas_project'){
        $variables['label'] = t('Project');
      }
      if ($variables['element']['#bundle'] == 'tapas_collection'){
        $variables['label'] = t('Collection');
      }
      break;
    case 'group_access':
      if ($variables['element']['#bundle'] == 'tapas_project'){
        $variables['label'] = t('Project Visibility');
      }
      if ($variables['element']['#bundle'] == 'tapas_collection'){
        $variables['label'] = t('Collection Visibility');
      }
      break;
  }
}

function tapas_redesign_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id){
    case 'tapas_record_node_form':
      $form['og_tapas_r_to_c']['und']['#title'] = t('Collection');
      break;
    case 'tapas_collection_node_form':
      $form['og_tapas_c_to_p']['und']['#title'] = t('Project');
      $form['group_access']['und']['#title'] = t('Collection Visibility');
      if (isset(drupal_get_query_parameters()['disabled']) && drupal_get_query_parameters()['disabled'] == 1){
        $form['og_tapas_c_to_p']['und']['#disabled'] = true;
        $form['group_access']['und']['#disabled'] = true;
      }
      break;
    case 'tapas_project_node_form':
      $form['group_access']['und']['#title'] = t('Project Visibility');
      break;
  }
}
