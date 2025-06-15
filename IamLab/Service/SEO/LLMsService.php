<?php
namespace IamLab\Service\SEO;

use IamLab\Model\Project;
use IamLab\Model\Post;
use IamLab\Model\Package;
use League\Flysystem\Filesystem;

class LLMsService
{
    private Filesystem $filesystem;
    private string $baseUrl;

    public function __construct(
        Filesystem $filesystem,
        string $baseUrl = 'https://iamlab.com'
    ) {
        $this->filesystem = $filesystem;
        $this->baseUrl = rtrim($baseUrl, '/');
    }

    public function generate(): bool
    {
        $content = $this->generateContent();
        $publicDir = ROOT_PATH . '/public';
        $filePath = $publicDir . '/llms.txt';

        try {
            $this->filesystem->write($filePath, $content);
            return true;
        } catch (\Exception $e) {
            error_log("Error generating llms.txt: " . $e->getMessage());
            throw new \RuntimeException("Failed to generate llms.txt: " . $e->getMessage());
        }
    }
    private function generateContent(): string
    {
        $projects = Project::find();
        $posts = Post::find();
        $packages = Package::find();
        $siteDetails = $this->getSiteDetails();

        $content = "# {$siteDetails['name']}\n\n";
        $content .= "> {$siteDetails['about']}\n\n";

        // Projects Section
        $content .= "## Projects\n\n";
        foreach ($projects as $project) {
            $content .= "- [{$project->getTitle()}]({$this->baseUrl}/project/{$project->getId()}): "
                . $this->truncateBody($project->getBody()) . "\n";
        }
        $content .= "\n";

        // Blog Posts Section
        $content .= "## Blog Posts\n\n";
        foreach ($posts as $post) {
            $content .= "- [{$post->getTitle()}]({$this->baseUrl}/post/{$post->getId()}): "
                . $this->truncateBody($post->getBody()) . "\n";
        }
        $content .= "\n";

        // Packages Section
        $content .= "## Packages\n\n";
        foreach ($packages as $package) {
            $content .= "- [{$package->getName()}]({$package->getLink()}): {$package->getDescription()}\n";
        }
        $content .= "\n";

        // Resources Section
        $content .= "## Resources\n\n";
        foreach ($siteDetails['resources'] as $resource) {
            $content .= "- [{$resource['title']}]({$this->baseUrl}{$resource['link']}): {$resource['description']}\n";
        }
        $content .= "\n";

        // Legal Section
        $content .= "## Legal\n\n";
        foreach ($siteDetails['legal'] as $legal) {
            $content .= "- [{$legal['title']}]({$this->baseUrl}{$legal['link']})\n";
        }

        return $content;
    }

    private function getSiteDetails(): array
    {
        return [
            'name' => 'IAM Lab',
            'about' => 'IAM Lab is an innovative technology laboratory focused on developing cutting-edge solutions in web development, artificial intelligence, and software architecture.',
            'resources' => [
                ['title' => 'Documentation', 'link' => '/docs', 'description' => 'Technical documentation and guides'],
                ['title' => 'API Reference', 'link' => '/api/docs', 'description' => 'API documentation'],
                ['title' => 'GitHub', 'link' => 'https://github.com/iam-lab', 'description' => 'Our open source projects']
            ],
            'legal' => [
                ['title' => 'Privacy Policy', 'link' => '/privacy'],
                ['title' => 'Terms of Service', 'link' => '/terms'],
                ['title' => 'AI Policy', 'link' => '/ai-policy']
            ]
        ];
    }

    private function truncateBody(string $body, int $length = 150): string
    {
        $body = strip_tags($body);
        if (mb_strlen($body) <= $length) {
            return $body;
        }

        return mb_substr($body, 0, $length) . '...';
    }
}