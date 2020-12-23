# My-Bratender Youtube Demo! 
    https://www.youtube.com/watch?v=EQ3wXLKkQs0

# bartender-frontend

This Application's purpose is to centralize the information a bartender or waiter needs to be aware of to do their job effectively. The My-Bartender app achieves this by using the Homepage as an overview of what is going on in the bar. From the Home page, the user can click on a table to assign a group there or see what the status of the groups already seated is.

# Homepage

The homepage provides a bird's eye view of the tables as the bar mapping through all the tables (set up on the backend currently) and seeing if a group exists at that table. Clicking on a table will route you to that table's Info page using React Router.

# Infopage

The Info page loads more data about the specific table. If the table is empty it simply gives you the option of seating a new group there (Validations needed). If there is already a group at this table it renders a food and drink portion to keep track of and allow the bartender to log orders from the group. the info page also keeps track of price 

# Header

The header navigates from the 3 main routes of the application the Home page and the two index pages of the application.

# Streach Features

    - Records feature to highlight what items in the store are selling well and which ones are not
    - Users table so this app can be used for any restaurant
        - Require CRUD for tables.
        - with this version, each Restaurant would be a user.
