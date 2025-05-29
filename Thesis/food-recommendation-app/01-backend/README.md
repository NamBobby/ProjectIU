### Watch the Project Setup Tutorial video (if needed): 
https://drive.google.com/file/d/18AolfRhHaXO47Ua0j8WSVZAl1zqtiQiB/view?usp=sharing


### Update .env file and database schema (MUST DO)
1. Access the google drive link: https://drive.google.com/drive/folders/1aOW8P_kIGP8OCURVpNkgZqXIujOVh9Jo?usp=sharing
2. Navigate to `01-backend` folder
3. Read `README` file to know how to update `.env` file 
4. Do the "Setting Up the `.env` File for the Project" strictly as the guide `README` step by step
5. Install the required library using npm by running the following command 
    1) Navigate to the project directory in your terminal.
    2) Navigate to `01-backend` directory following this command: `cd 01-backend/`

    ## macOS Setup
    3) Create a virtual environment:
    `python3 -m venv venv`

    4) Activate the virtual environment:
   `source venv/bin/activate`

    5) Install dependencies**:
   `pip install -r requirements.txt`

    6) Run the Flask application**:
    `  python app.py`

    ## Windows Setup

    3) Install dependencies:
    `pip install -r requirements.txt`

    4) Run the Flask application:

    `python app.py`

6. (If needed) Troubleshooting: 
    If you encounter a port conflict (port 5000 is already in use), you can:

    1) Open the `01-backend/app.py` file
    2) Change the port number in the following line:
     from: 
        `app.run(host="0.0.0.0", port=5000, debug=False)`
     to another port like 5001 or 5002:
        `app.run(host="0.0.0.0", port=5001, debug=False)`

7. Configuring the Frontend : 
    After successfully running the backend, you will see output similar to:

        * Running on all addresses (0.0.0.0)
        * Running on http://127.0.0.1:5000
        * Running on http://192.168.x.x:5000

    Take note of your network address (like http://192.168.x.x:5000) and use it to configure the frontend:

    1) Create a .env file in the 00-frontend directory
    2) Add the following line:
        `API_URL=http://192.168.x.x:5000`
        (Replace 192.168.x.x with your actual IP address from the backend output.)