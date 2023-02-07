// Copyright (c) 2023, MT and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Locker Booking', {
	start_time : function(frm) {
		let var_start_time = frm.doc.start_time.slice(0,2) + ":00:00";
		let var_time = Number(frm.doc.start_time.slice(0,2)) + Number(frm.doc.no_of_hours)
		// console.log(var_time)
		if (var_time > 23) {
			var_time = 23;
		};
		let var_end_time = var_time.toString() + ":00:00";
		frm.set_value('start_time', var_start_time);
		frm.set_value('end_time', var_end_time);
	},
	no_of_hours : function(frm) {
		let var_time = Number(frm.doc.start_time.slice(0,2)) + Number(frm.doc.no_of_hours)
		if (var_time > 23) {
			var_time = 23;
		};
		let var_end_time = var_time.toString() + ":00:00";
		frm.set_value('end_time', var_end_time);
	},
    validate : function(frm) {
		let global_start_time2 = frappe.db.get_single_value("Gym Locker Details", "start_time")
		let global_start_time = global_start_time2.then(toHour)
		let global_end_time = frappe.db.get_single_value("Gym Locker Details", "end_time").then(toHour)
		let var_start_time = Number(frm.doc.start_time.slice(0,2))
		let var_end_time = Number(frm.doc.end_time.slice(0,2))
		let global_no_of_lockers = frappe.db.get_single_value("Gym Locker Details", "no_of_lockers")
		console.log(global_start_time)
		//console.log(var_start_time)
		if (var_start_time<global_start_time || var_end_time>global_end_time) {		
			frappe.throw('You can not select past date in From Date' + global_start_time, global_end_time, global_no_of_lockers)
		};
	},
});

function toHour(strTime) {
	//console.log(typeof String(strTime));
	//const result1 = typeof strTime === 'time' // ? strTime.slice(2) : '';
	//console.log(result1);
	//var str2 = 0
	//console.log(strTime)
	const strTime2 = strTime
	//console.log(typeof strTime2)
	//console.log(strTime2.slice(1,2))
	const str1 = strTime2.slice(1,2);
	if (str1 == ":") {
		var str2 = Number(strTime2.slice(0,1))
		//console.log(strTime2.slice(0,1))
	}
	else {
		var str2 = Number(strTime2.slice(0,2))
		//console.log(strTime2.slice(0,2))
	}
	console.log(str2);
	return str2;
}

