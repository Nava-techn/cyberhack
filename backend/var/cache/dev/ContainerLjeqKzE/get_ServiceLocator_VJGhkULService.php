<?php

namespace ContainerLjeqKzE;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_VJGhkULService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.vJGhkUL' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.vJGhkUL'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'eventCardRepository' => ['privates', 'App\\Repository\\EventCardRepository', 'getEventCardRepositoryService', true],
        ], [
            'eventCardRepository' => 'App\\Repository\\EventCardRepository',
        ]);
    }
}
