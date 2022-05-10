/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DatabaseProject;

/**
 *
 * @author Admin
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String connectionUrl="jdbc:sqlserver://localhost:1433;databaseName=Data;user=sa;password=sa";
        new Login(connectionUrl).setVisible(true);
        // TODO code application logic here
    }
    
}