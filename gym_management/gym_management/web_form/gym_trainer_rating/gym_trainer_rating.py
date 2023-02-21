from __future__ import unicode_literals

import frappe

def get_context(context):
	# do your magic here
	pass

@frappe.whitelist()
def print_msg(test_arg):
	frappe.msgprint("Testing")
	return True

@frappe.whitelist()
def check_picture(gym_trainer):
	check_exist = frappe.db.exists('Gym Trainer', gym_trainer)
	if (check_exist != None) :
		picture = frappe.db.get_value('Gym Trainer', check_exist, 'picture')
	frappe.msgprint(check_exist + ' test')
	return picture
