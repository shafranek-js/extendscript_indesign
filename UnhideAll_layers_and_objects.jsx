// Function to unhide and unlock all layers and their objects
function unhideAndUnlockAll(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if (layer.isValid) {
            layer.locked = false; // Unlock the layer
            layer.visible = true; // Unhide the layer

            for (var j = 0; j < layer.pageItems.length; j++) {
                var item = layer.pageItems[j];
                if (item.isValid) {
                    item.locked = false; // Unlock the item
                    item.visible = true; // Unhide the item
                }
            }
        }
    }
}

// Function to delete hidden and unlock locked layers and their objects
function deleteHiddenAndUnlockAll(doc) {
    for (var i = doc.layers.length - 1; i >= 0; i--) {
        var layer = doc.layers[i];
        if (layer.isValid) {
            if (!layer.visible) {
                layer.locked = false; // Unlock the layer before deleting
                layer.remove(); // Delete the layer if it's hidden
            } else {
                layer.locked = false; // Unlock the layer

                for (var j = layer.pageItems.length - 1; j >= 0; j--) {
                    var item = layer.pageItems[j];
                    if (item.isValid) {
                        if (!item.visible) {
                            item.locked = false; // Unlock the item before deleting
                            item.remove(); // Delete the item if it's hidden
                        } else {
                            item.locked = false; // Unlock the item
                        }
                    }
                }
            }
        }
    }
}

// Function to unlock all layers and their objects without changing visibility
function unlockAll(doc) {
    for (var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if (layer.isValid) {
            layer.locked = false; // Unlock the layer

            for (var j = 0; j < layer.pageItems.length; j++) {
                var item = layer.pageItems[j];
                if (item.isValid) {
                    item.locked = false; // Unlock the item
                }
            }
        }
    }
}

// Check if there is an active document
if (app.documents.length === 0) {
    alert("No active document found. Please open a document and try again.");
} else {
    // Get the active document
    var doc = app.activeDocument;

    // Create the UI
    var dialog = new Window('dialog', 'Choose Action');
    dialog.orientation = 'column';
    dialog.add('statictext', undefined, 'Choose an action:');

    // Create a panel for radio buttons
    var radioGroup = dialog.add('panel', undefined, 'Action');
    radioGroup.orientation = 'column';
    radioGroup.alignChildren = 'left';

    // Add radio buttons with tooltips
    var unhideRadio = radioGroup.add('radiobutton', undefined, 'Unhide and unlock all hidden layers and objects');
    unhideRadio.helpTip = "Make all hidden layers and objects visible and unlock them.";
    var deleteRadio = radioGroup.add('radiobutton', undefined, 'Delete all hidden layers and objects, unlock all layers and objects');
    deleteRadio.helpTip = "Remove all hidden layers and objects from the document and unlock all layers and objects.";
    var unlockRadio = radioGroup.add('radiobutton', undefined, 'Unlock all layers and objects without changing visibility');
    unlockRadio.helpTip = "Unlock all layers and objects without changing their visibility.";
    unhideRadio.value = true;  // Set default selection

    // Add OK and Cancel buttons with tooltips
    var buttonGroup = dialog.add('group');
    buttonGroup.alignment = 'center';
    var okButton = buttonGroup.add('button', undefined, 'OK', {name: 'ok'});
    okButton.helpTip = "Perform the selected action.";
    var cancelButton = buttonGroup.add('button', undefined, 'Cancel', {name: 'cancel'});
    cancelButton.helpTip = "Cancel the action and close the dialog.";

    // Add a Help button
    var helpButton = dialog.add('button', undefined, 'Help');
    helpButton.helpTip = "Learn more about how to use this script.";

    // Show help information when the Help button is clicked
    helpButton.onClick = function() {
        alert("This script allows you to either unhide and unlock all hidden layers and objects in the active InDesign document, delete all hidden layers and objects, and unlock all layers and objects, or just unlock all layers and objects without changing their visibility.\n\n" +
              "1. Select 'Unhide and unlock all hidden layers and objects' to make everything visible and unlocked.\n" +
              "2. Select 'Delete all hidden layers and objects, unlock all layers and objects' to remove hidden items and unlock everything.\n" +
              "3. Select 'Unlock all layers and objects without changing visibility' to unlock everything without affecting visibility.\n" +
              "4. Click 'OK' to perform the selected action.\n" +
              "5. Click 'Cancel' to exit without making any changes.");
    };

    // Show the dialog and get the user's choice
    if (dialog.show() == 1) {
        if (unhideRadio.value) {
            unhideAndUnlockAll(doc);
            alert("All hidden layers and objects are now visible and unlocked.");
        } else if (deleteRadio.value) {
            deleteHiddenAndUnlockAll(doc);
            alert("All hidden layers and objects have been deleted, and all layers and objects are now unlocked.");
        } else if (unlockRadio.value) {
            unlockAll(doc);
            alert("All layers and objects are now unlocked.");
        }
    } else {
        alert("Action canceled. No changes were made.");
    }
}
