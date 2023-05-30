from django import template

register = template.Library()


@register.filter(name='rangefilter')
def rangefilter(number):
    return range(number)
