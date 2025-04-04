<?php
// src/EventListener/RequestLogger.php
namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;
use Psr\Log\LoggerInterface;

class RequestLogger
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        $method = $request->getMethod();
        $path = $request->getPathInfo();

        // Journaliser toutes les requêtes GET
        if ($method === 'GET') {
            $this->logger->info("Requête GET détectée sur la route : $path");
        }
    }
}
