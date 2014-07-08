/*
 * Spreed WebRTC.
 * Copyright (C) 2013-2014 struktur AG
 *
 * This file is part of Spreed WebRTC.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
define(['jquery', 'underscore', 'text!partials/contactsmanagerbutton.html', 'text!partials/contactsmanager.html'], function($, _, templateContactsManagerButton,templateContactsManager) {

	return ['contacts', 'alertify', function(contacts, alertify) {

		var contactsManagerController = ['$scope', '$modalInstance', 'contactData', 'data', 'defaultModalController', function($scope, $modalInstance, contactData, data, defaultModalController) {
			$scope.contacts = null;

			var getContacts = function() {
				$scope.contacts = contactData.getAll();
			};
			getContacts();
			contacts.e.on('contactadded', function() {
				getContacts();
			});

			// Set state based on default controller
			defaultModalController[3]($scope, $modalInstance, data);
		}];

		var controller = ['$scope', '$modal', function($scope, $modal) {
			// Setup an api to pass the html body template to alertify
			$scope.contactsManager = function() {
				alertify.dialog.buildCustom({'windowClass': 'contactsmanager', 'header': _('Contacts Manager'), 'bodydom': templateContactsManager, 'footerdom': null, 'controller': contactsManagerController});
			};
		}];

		var link = function($scope, $element) {};

		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: templateContactsManagerButton,
			controller: controller,
			link: link
		};
	}];

});
