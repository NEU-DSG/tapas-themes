<?php

/**
 * @file
 * Default theme implementation to display a region.
 *
 * Available variables:
 * - $content: The content for this region, typically blocks.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - region: The current template type, i.e., "theming hook".
 *   - region-[name]: The name of the region with underscores replaced with
 *     dashes. For example, the page_top region would have a region-page-top class.
 * - $region: The name of the region variable as defined in the theme's .info file.
 *
 * Helper variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $is_admin: Flags true when the current user is an administrator.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 *
 * @see template_preprocess()
 * @see template_preprocess_region()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<?php if ($content): ?>
  <div class="<?php print $classes; ?> toolbar">
    <a class="collapsed toolbar-link" data-toggle="collapse" href="#tools" aria-expanded="false" aria-controls="tools">
      <span class=" fa-stack fa-lg">
        <i class="fa fa-square fa-stack-2x"></i>
        <i class="fa fa-wrench fa-stack-1x fa-inverse"></i>
      </span>
      <span class="toolbar-title">Tools</span>
    </a>
    <div id="tools" class="collapse" role="tabpanel" aria-labelledby="toolsHeading">
      <div class="tools-content">
        <?php print $content; ?>
      </div>
    </div>
  </div>
<?php endif; ?>
