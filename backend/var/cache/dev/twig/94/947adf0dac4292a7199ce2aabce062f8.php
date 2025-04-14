<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* card/list.html.twig */
class __TwigTemplate_2f8a83a10e4c56852ce3adf72b602f2b extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "card/list.html.twig"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "card/list.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html>
<head>
    <title>Liste des cartes</title>
</head>
<body>
    <h1>Liste des cartes</h1>
    <ul>
        ";
        // line 9
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable((isset($context["cards"]) || array_key_exists("cards", $context) ? $context["cards"] : (function () { throw new RuntimeError('Variable "cards" does not exist.', 9, $this->source); })()));
        foreach ($context['_seq'] as $context["_key"] => $context["card"]) {
            // line 10
            yield "            <li>
                ID: ";
            // line 11
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["card"], "id", [], "any", false, false, false, 11), "html", null, true);
            yield " - Type: ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["card"], "type", [], "any", false, false, false, 11), "html", null, true);
            yield " - Spécial: ";
            yield ((CoreExtension::getAttribute($this->env, $this->source, $context["card"], "isSpecial", [], "any", false, false, false, 11)) ? ("Oui") : ("Non"));
            yield "
                ";
            // line 12
            if (CoreExtension::getAttribute($this->env, $this->source, $context["card"], "imageUrl", [], "any", false, false, false, 12)) {
                // line 13
                yield "                    <img src=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl(("images/" . CoreExtension::getAttribute($this->env, $this->source, $context["card"], "imageUrl", [], "any", false, false, false, 13))), "html", null, true);
                yield "\" alt=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["card"], "type", [], "any", false, false, false, 13), "html", null, true);
                yield "\" width=\"100\">
                ";
            }
            // line 15
            yield "                <form action=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("destroy_card", ["id" => CoreExtension::getAttribute($this->env, $this->source, $context["card"], "id", [], "any", false, false, false, 15)]), "html", null, true);
            yield "\" method=\"post\" style=\"display:inline;\">
                    <button type=\"submit\">Supprimer</button>
                </form>
            </li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['card'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 20
        yield "    </ul>
    <form action=\"";
        // line 21
        yield $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("reset_shield_cards");
        yield "\" method=\"post\">
        <button type=\"submit\">Réinitialiser les cartes boucliers</button>
    </form>
</body>
</html>";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "card/list.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  98 => 21,  95 => 20,  83 => 15,  75 => 13,  73 => 12,  65 => 11,  62 => 10,  58 => 9,  48 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<!DOCTYPE html>
<html>
<head>
    <title>Liste des cartes</title>
</head>
<body>
    <h1>Liste des cartes</h1>
    <ul>
        {% for card in cards %}
            <li>
                ID: {{ card.id }} - Type: {{ card.type }} - Spécial: {{ card.isSpecial ? 'Oui' : 'Non' }}
                {% if card.imageUrl %}
                    <img src=\"{{ asset('images/' ~ card.imageUrl) }}\" alt=\"{{ card.type }}\" width=\"100\">
                {% endif %}
                <form action=\"{{ path('destroy_card', { id: card.id }) }}\" method=\"post\" style=\"display:inline;\">
                    <button type=\"submit\">Supprimer</button>
                </form>
            </li>
        {% endfor %}
    </ul>
    <form action=\"{{ path('reset_shield_cards') }}\" method=\"post\">
        <button type=\"submit\">Réinitialiser les cartes boucliers</button>
    </form>
</body>
</html>", "card/list.html.twig", "C:\\xampp\\htdocs\\cyberha\\backend\\templates\\card\\list.html.twig");
    }
}
