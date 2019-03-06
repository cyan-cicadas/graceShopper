/*

fakename2@gmail.com

Ab123456

Reece
	- admin
	- debug string verification regex

functional cart

	- resolve cart versions btw local & remote

	- edit cart / delete from cart
	
	- checkout 
	- React Toast Notification
	- eliminate logging middleware

DONE graph ql style product info loading
	- load all product info with cart get route


DONE cart editing routes- cart put route to edit data in current cart
	- put route to update quantity
	= put route to delete the item


add to cart- create or find and create

render products

update and remove

checkout- stripe - kill the order and create an empty one 
	if logic in update- 
	when i click checkout, the hwole thing goes away



TIER 1: MVP SHOPPING EXPERIENCE

๏ Two roles: guests (not signed in) and users (signed in)
๏ Deployed (online!)
๏ See all products

๏ Add to cart / edit cart
๏ Checkout (submit order)
๏ Backend data validations
๏ Rudiments of security




agenda


	tier one 
	(back end) 

	- consumer model xxxx
	- supplier model xxxx
	- products xxx 
	- order 
	- order history
	- cart
	- associations- separate file
	- routes- all and individual for:
				- consumer
				- supplier
				- products
				- order
				- cart

	(front end) 

	- buy items
	- spiel about farm direct  
	- seed data with photos for front end

	second tier

	- configure UI framework- Semantic/Material UI
	- farmers view their page
	- users: display order history
	- farmers: display sales history
	
	- admin
	- stripe API for payments
	- oauth






Database

Farms
	- capacity- output per week (an object - key would be the meat, the property would be the weekly maximum output)

User
	- name
	- home address
	- payment method

Meats
	- type- chicken, pork, geese, beef, goat, lamb
	- organic- boolean
	- subtype- angus, wagyoo 
	- region- 
	- grade- prime, choice, lower 

cart 
	- item
	- quantity

Order
	- meat
	- quantity
	- shipping address
	- delivered

Address 
	- name
	- street
	- zip
	- type: home, shipping, or billing

Associations
	- farms have an address
	- customers have an address
	- order has an address
	- farms have many meats
	- meats belong to many farms
	- orders have many meats

*/
