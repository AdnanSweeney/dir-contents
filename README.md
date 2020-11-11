# Dir-Contents

This is an Express-hosted React app + CLI that allows users to find information on every file and directory within a selected folder. 

## Usage

1. Clone Repo: `git clone https://github.com/AdnanSweeney/dir-contents.git`
2. Change directory to repo: `cd dir-contents`
3. Install required modules: `npm install`

That's it! Now you can access the React UI by invoking the script `npm run start-gui` and going to [http://localhost:5000/](http://localhost:5000/), or access the CLI by invoking the script `npm run start-server`, and then in a new terminal  run `npm run start-cli`
## Approach

Both the React app and the CLI will send a response to the Express API with a directory path given as a parameter. Using that path and the fs library, the Express app will read that directory and return a formatted list of files and folders that are in the given directory. From there, both interfaces will display the directory information for the user, and allow the user to continue navigating through their file system and displaying those folders' contents. 

## Improvements

This app is not currently production-ready. The following things could be improved upon and fleshed out in a higher-grade application

* **Unit Testing** - all testing was done manually
* **File Sorting** - allow the user to sort files by last modified date, size, or filename in ascending and descending order
* **GUI Path Navigation** - allow the user to click on each sub-directory displayed in the path to select that directory
* **Docker Composition** - allow the user access the CLI or the GUI with a single script by enclosing the server environment in a Docker file
* **Cloud Hosting** - this app is currently only working when locally hosted. I am not sure how I would be able to access a filesystem using a cloud-hosted Express app

## Challenges

My first intuition was to use the html file picker and upload to select a directory, and send the file path to Express to read through that directory with the fs library. I found out that the web browser cannot access the full path of a file or folder due to security reasons.

I then attempted to learn how to upload a folder to Express. Eventually after trying out many different methods, I learned that the HTML file picker would not be able to capture any information about directores, only files. This meant that if I chose a directory that only contained empty directories, I would not be able to send that information to Express.

This is when I realized I had to create my very own "file explorer" so that the user could navigate through their file system without actually sending a path from their browser. The locally hosted Express app had access to those files and paths, and I could send those paths to the browser in order to display everything visually.