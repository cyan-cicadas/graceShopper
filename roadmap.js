/*

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
	- HTML/CSS layout- wireframe
	- view by farms
	- view by product
	- view user page
	- add products to cart
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
