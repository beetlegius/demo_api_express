import { AbilityBuilder, Ability } from 'casl'

const defineAbilitiesFor = (user) => {
  const { rules, can } = AbilityBuilder.extract()

  if (user) {
    can('profile', 'User')
    can('read', ['Category', 'Product'])

    if (user.role === 'admin') {
      can('manage', ['Category', 'Product'])
    }

    if (user.role === 'superadmin') {
      can('manage', 'all')
    }

  }

  return new Ability(rules)
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null)

export const createAbilities = (req, res, next) => {
  req.ability = req.user.email ? defineAbilitiesFor(req.user) : ANONYMOUS_ABILITY
  next()
}
