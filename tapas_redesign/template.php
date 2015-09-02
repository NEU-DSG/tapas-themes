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
}

function tapas_redesign_preprocess_node(&$variables){
  if ($node->type == 'tapascollection-project' && $variables['view_mode'] == 'full'){
    $variables ['classes_array'][] = "col-sm-3";
  }
}
