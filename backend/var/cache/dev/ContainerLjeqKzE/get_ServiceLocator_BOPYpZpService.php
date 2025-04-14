<?php

namespace ContainerLjeqKzE;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_BOPYpZpService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.bOPYpZp' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.bOPYpZp'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'App\\Controller\\Api\\EventCardController::createEventCard' => ['privates', '.service_locator.IFErg9b', 'get_ServiceLocator_IFErg9bService', true],
            'App\\Controller\\Api\\EventCardController::getRandomEventCard' => ['privates', '.service_locator.vJGhkUL', 'get_ServiceLocator_VJGhkULService', true],
            'App\\Controller\\AttaqueController::getAttaque' => ['privates', '.service_locator.aKM6MDa', 'get_ServiceLocator_AKM6MDaService', true],
            'App\\Controller\\AuthController::register' => ['privates', '.service_locator.mK6IRPJ', 'get_ServiceLocator_MK6IRPJService', true],
            'App\\Kernel::loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'App\\Kernel::registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel::loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel::registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'App\\Controller\\Api\\EventCardController:createEventCard' => ['privates', '.service_locator.IFErg9b', 'get_ServiceLocator_IFErg9bService', true],
            'App\\Controller\\Api\\EventCardController:getRandomEventCard' => ['privates', '.service_locator.vJGhkUL', 'get_ServiceLocator_VJGhkULService', true],
            'App\\Controller\\AttaqueController:getAttaque' => ['privates', '.service_locator.aKM6MDa', 'get_ServiceLocator_AKM6MDaService', true],
            'App\\Controller\\AuthController:register' => ['privates', '.service_locator.mK6IRPJ', 'get_ServiceLocator_MK6IRPJService', true],
            'kernel:loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel:registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
        ], [
            'App\\Controller\\Api\\EventCardController::createEventCard' => '?',
            'App\\Controller\\Api\\EventCardController::getRandomEventCard' => '?',
            'App\\Controller\\AttaqueController::getAttaque' => '?',
            'App\\Controller\\AuthController::register' => '?',
            'App\\Kernel::loadRoutes' => '?',
            'App\\Kernel::registerContainerConfiguration' => '?',
            'kernel::loadRoutes' => '?',
            'kernel::registerContainerConfiguration' => '?',
            'App\\Controller\\Api\\EventCardController:createEventCard' => '?',
            'App\\Controller\\Api\\EventCardController:getRandomEventCard' => '?',
            'App\\Controller\\AttaqueController:getAttaque' => '?',
            'App\\Controller\\AuthController:register' => '?',
            'kernel:loadRoutes' => '?',
            'kernel:registerContainerConfiguration' => '?',
        ]);
    }
}
