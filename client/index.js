import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '/imports/App'

Meteor.subscribe('user')
Meteor.subscribe('categories')

Meteor.startup(() => {
  render(App(), document.getElementById('app'))
})
