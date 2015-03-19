# tapas-themes


INFO ABOUT TAPAS THEMING

Adaptivetheme must be enabled prior to Tapas_base being enabled. Then tapas_base can be enabled and set to default. The .info file for the theme should take care of the custom settings that are saved in the database.

I updated Adapativetheme and recreated a Tapas_base from the Pixture_reloaded subtheme to make sure it was all up to date. Both of those themes are out of the box so upgrade paths are normal.

For Tapas_base I copied in all of the styling from the old Tapas_base (in color/colors.css and css/tapas_base.css). I'm sure things won't work as expected initially as things have changed classes and IDS. But this is a starting point. It will need to be readjusted and cleaned up.

I readded the ie stylesheets which has been previously created as well.

In the images directory, there is an added folder for icons which I believe were being called by a function from the template.php file. I have commented that function out for the time being but have carried the images over in case they are needed in the future.

Speaking of templates, the templates directory at the on set is what comes out of the box with pixture_reloaded. I carried in the old templates in the directory templates-old. I examined those templates and noticed there are some changes which may need to be reinstituted in another way. There are no changes to the comment.tpl.php file. The page--charpopup.tpl.php is a new file but is essentially a blank template. I'm not sure what it was used for. The page.tpl.php file has been modified in several places- it looks like most of these are noted with comments so if the functionality needs to be reproduced externally, it should be possible. The patrick.php file and the variations of search-result.tpl.php (except for actual search-result.tpl.php) are probably cruft not being used and safe to delete. The search-result.tpl.php seems to have some pretty significant work in it some this may need to be recreated elsewhere. There are also several commented changes in the views-view.tpl.php which may need to be moved as well.

In the template.php file, the only changes that had been made to the original tapas base theme was the addition of two functions. I added these functions and commented them out at the bottom of the file in case we were wondering what used to happen with this file and in case the functionality needs to be recreated elsewhere. I believe this is where the images/icons directory was coming into play.


/*Default drupal info below*/
Place downloaded and custom themes that modify your site's appearance in this
directory to ensure clean separation from Drupal core and to facilitate safe,
self-contained code updates. Contributed themes from the Drupal community may
be downloaded at http://drupal.org/project/themes.

It is safe to organize themes into subdirectories and is recommended to use
Drupal's sub-theme functionality to ensure easy maintenance and upgrades.

In multisite configuration, themes found in this directory are available to
all sites. Alternatively, the sites/your_site_name/themes directory pattern may
be used to restrict themes to a specific site instance.

Refer to the "Appearance" section of the README.txt in the Drupal root
directory for further information on theming.

