<?php
// Pixture Reloaded by Adaptivethemes.com

/**
 * Override or insert variables into the html template.
 */
function tapas_base_preprocess_html(&$vars) {
  global $theme_key;

  $theme_name = 'tapas_base';
  $path_to_theme = drupal_get_path('theme', $theme_name);

  // Add a class for the active color scheme
  if (module_exists('color')) {
    $class = check_plain(get_color_scheme_name($theme_key));
    $vars['classes_array'][] = 'color-scheme-' . drupal_html_class($class);
  }

  // Add class for the active theme
  $vars['classes_array'][] = drupal_html_class($theme_key);

  // Add theme settings classes
  $settings_array = array(
    'box_shadows',
    'body_background',
    'menu_bullets',
    'menu_bar_position',
    'corner_radius',
  );
  foreach ($settings_array as $setting) {
    $vars['classes_array'][] = theme_get_setting($setting);
  }

  // Special case for PIE htc rounded corners, not all themes include this
  if (theme_get_setting('ie_corners') == 1) {
    drupal_add_css($path_to_theme . '/css/ie-htc.css', array(
      'group' => CSS_THEME,
      'browsers' => array(
        'IE' => 'lte IE 8',
        '!IE' => FALSE,
        ),
      'preprocess' => FALSE,
      )
    );
  }
}

/**
 * Override or insert variables into the html template.
 */
function tapas_base_process_html(&$vars) {
  // Hook into color.module
  if (module_exists('color')) {
    _color_html_alter($vars);
  }
}

/**
 * Override or insert variables into the page template.
 */
function tapas_base_process_page(&$vars) {
  // Hook into color.module
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

/**
 * Override or insert variables into the block template.
 */
function tapas_base_preprocess_block(&$vars) {
  if($vars['block']->module == 'superfish' || $vars['block']->module == 'nice_menu') {
    $vars['content_attributes_array']['class'][] = 'clearfix';
  }
}


/*THESE ARE COPIES OF THE OLD FUNCTIONS FROM TAPAS_BASE IN CASE WE NEED THEM*/
//ADDED method from http://www.alisonhover.com/blog/201208/how-customise-default-file-icons-drupal-7 to have custom file icons
//function tapas_base_file_icon($variables) {
  //$file = $variables['file'];
  //$icon_directory = drupal_get_path('theme', 'tapas_base') . '/images/icons';
//exit(print_r($icon_directory));
  //$mime = check_plain($file->filemime);
  //$icon_url = file_icon_url($file, $icon_directory);
  //return '<img alt="" class="file-icon" src="' . $icon_url . '" title="' . $mime . '" />';
//}
//END
// Add some cool text to the search block form
//function tapas_base_form_alter(&$form, &$form_state, $form_id) {
  //if ($form_id == 'search_block_form') {
    // HTML5 placeholder attribute
    //$form['search_block_form']['#attributes']['placeholder'] = t('Search TAPAS');
  //}
//}
/*END COPIES OF OLD FUNCTIONS FROM TAPAS_BASE*/
