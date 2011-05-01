It is a small extension for ExtJs library.

It displays small and no-annoying messages to user. For example:

<img src='https://github.com/millioner/ExtJsFunTip/blob/master/example-images/success.png?raw=true'/>

or

<img src='https://github.com/millioner/ExtJsFunTip/blob/master/example-images/form_error_.png?raw=true'/>

##Usage:

1. Sure you have to use ExtJs (was tested only with ExtJs 3.x)
2. Copy `js`, `css` and `image` folders to project and include `css/tooltip.css` and `js/tooltip.js` to your html page
3. Profit!!!

##Displaying success message
    Ext.Tips.msg('Success', 'Operation was completed');

##Displaying error message
    Ext.Tips.popup(Ext.Tips.CRITICAL, 'Unable to delete user.');
You can also use `Ext.Tips.WARNING`, `Ext.Tips.INFO` or `Ext.Tips.HELP` for different styling

##And displaying form errors
Some times we have tabs inside a form, and user cannot see validation error at unactive tabs. So you can show it with tooltip:
    Ext.Tips.formErrors(form);

Also you can display validation errors, which was returned from the server:
    Ext.Tips.formErrors(form, response.result.errors);

Where `response.result.errors` is an array of objects. For example:

    [
        {
            "id": "email",
            "msg": "Email 'user@example.com' is already in use"
        },
        {
            "id": "login",
            "msg": "Login 'user' is already in use"
        },
        {
            "msg": "You have no rights for adding new users"
        }
    ]

So, `id` is a field name that contains an error and `msg` is an error message. There is no `id` the last array item, it is okay - just general error message with no connection to some field.
