### Watch the Project Setup Tutorial video (if needed): 
https://drive.google.com/file/d/18AolfRhHaXO47Ua0j8WSVZAl1zqtiQiB/view?usp=sharing

### Instrallation Steps (MUST DO): 
1. Navigate to the project directory in your terminal.
2. Navigate to `00-frontend` directory following this command: `cd 00-frontend/`
3. Install the required library using npm by running the following command: `npm i` or `npm install`
4. Update file `.env` (IMPORTANT: You must first complete the backend setup in 01-backend folder before this step!)
    1) Make sure your backend server is running successfully (from steps in the `cd 01-backend/README.md`
    2) When your backend server is running, it will display something like:
      * Running on all addresses (0.0.0.0)
      * Running on http://127.0.0.1:5000
      * Running on http://192.168.x.x:5000
    3) Create a new `.env` file or rename `.env.example` into `.env` in the `00-frontend` directory
    4) Add the following line to the file, replacing the IP address with your actual backend server address:
      API_URL=http://192.168.x.x:5000
      (Where 192.168.x.x is your actual IP address shown when running the backend server)
5. Run the project by running the following command : `npm start` 
(Ensure that you did the step "2. Navigate to `00-frontend` directory following this command: `cd 00-frontend/`" before running the project `npm start` command)