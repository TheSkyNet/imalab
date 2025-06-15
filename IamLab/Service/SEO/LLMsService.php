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
            if (file_put_contents($filePath, $content) === false) {
                throw new \RuntimeException("Failed to write to file: $filePath");
            }
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

        $content = "# IAM Lab\n\n";
        $content .= "> IAM Lab is an innovative technology laboratory focused on developing cutting-edge solutions in web development, artificial intelligence, and software architecture.\n\n";

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
        $content .= "- [Documentation]({$this->baseUrl}/docs): Technical documentation and guides\n";
        $content .= "- [API Reference]({$this->baseUrl}/api/docs): API documentation\n";
        $content .= "- [GitHub](https://github.com/iam-lab): Our open source projects\n\n";

        // Legal Section
        $content .= "## Legal\n\n";
        $content .= "- [Privacy Policy]({$this->baseUrl}/privacy): Our privacy policy\n";
        $content .= "- [Terms of Service]({$this->baseUrl}/terms): Terms of service\n";
        $content .= "- [AI Policy]({$this->baseUrl}/ai-policy): AI/LLM usage policy\n";

        return $content;
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