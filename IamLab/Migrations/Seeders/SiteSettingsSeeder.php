<?php

namespace IamLab\Migrations\Seeders;

use IamLab\Model\SiteSetting;
use Phalcon\Migrations\Mvc\Model\Migration;

class SiteSettingsSeeder extends Migration
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'site_name',
                'value' => 'IAM Lab',
                'type' => SiteSetting::TYPE_STRING,
                'description' => 'The name of the website'
            ],
            [
                'key' => 'site_description',
                'value' => 'IAM Lab is an innovative technology laboratory focused on developing cutting-edge solutions',
                'type' => SiteSetting::TYPE_STRING,
                'description' => 'Main site description'
            ],
            [
                'key' => 'posts_per_page',
                'value' => '10',
                'type' => SiteSetting::TYPE_INT,
                'description' => 'Number of posts to display per page'
            ],
            [
                'key' => 'maintenance_mode',
                'value' => '0',
                'type' => SiteSetting::TYPE_BOOL,
                'description' => 'Whether the site is in maintenance mode'
            ],
            [
                'key' => 'social_links',
                'value' => json_encode([
                    'github' => 'https://github.com/iam-lab',
                    'twitter' => 'https://twitter.com/iamlab',
                    'linkedin' => 'https://linkedin.com/company/iam-lab'
                ]),
                'type' => SiteSetting::TYPE_JSON,
                'description' => 'Social media links'
            ],
            [
                'key' => 'seo_meta_tags',
                'value' => json_encode([
                    'keywords' => 'technology,innovation,web development,AI',
                    'author' => 'IAM Lab',
                    'robots' => 'index,follow'
                ]),
                'type' => SiteSetting::TYPE_JSON,
                'description' => 'Default SEO meta tags'
            ]
        ];

        foreach ($settings as $settingData) {
            $setting = new SiteSetting();
            $setting->setKey($settingData['key']);
            $setting->setType($settingData['type']);
            $setting->setValue($settingData['value']);
            $setting->setDescription($settingData['description']);

            if (!$setting->save()) {
                echo "Failed to save setting: " . $setting->getKey() . "\n";
                foreach ($setting->getMessages() as $message) {
                    echo $message->getMessage() . "\n";
                }
            } else {
                echo "Successfully created setting: " . $setting->getKey() . "\n";
            }
        }
    }
}