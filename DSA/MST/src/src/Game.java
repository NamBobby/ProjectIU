package src;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


/**
 * The main Game class that specifies the frame and widgets of the GUI
 * 
 * @author jeffreyxiao
 *
 */
public class Game extends JPanel implements Runnable {

	private static final long serialVersionUID = -925518549680460124L;

	@Override
	public void run() {
		
		// Top-level frame in which game components live
		JFrame frame = new JFrame("Minesweeper");
		frame.setLocation(100, 100);
		
		int currentTime = 0;
		final JLabel timerLabel = new JLabel("Current Time (sec): " + currentTime);
		
		int flagsRemaining = 30;
		final JLabel flagLabel = new JLabel("Flags Remaining: " + flagsRemaining);
		
		//Status panel
		final JPanel status_panel = new JPanel();
		frame.add(status_panel, BorderLayout.SOUTH);
		final JLabel status = new JLabel("Running...");
		status_panel.add(status);
		
		//Main playing area
		final GameCourt court = new GameCourt(status, timerLabel, flagLabel);
		final JPanel myBoard = court.makeAndAddBoard();
		frame.add(myBoard, BorderLayout.CENTER);
		
		//Control panel
		final JPanel control_panel = new JPanel();
		frame.add(control_panel, BorderLayout.NORTH);  
		
		//Label showing current number of flags remaining
        control_panel.add(flagLabel);
        
        //Button allowing user to reset game and start over
        final JButton reset = new JButton("Reset Game");
        reset.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
            	court.reset();
            }
        });
        control_panel.add(reset);
        
        //Button that allows user to import text file of game
        final JButton openGame = new JButton("Open");
        openGame.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
            	court.importGameStateMediate();
            }
        });
        control_panel.add(openGame);
        
        //Button that allows user to export text file of game
        final JButton save = new JButton("Save");
        save.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
            	court.exportGameState();
            }
        });
        control_panel.add(save);
        
        //Button that allows user to undo history of moves
        final JButton undo = new JButton("Undo");
        undo.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
            	court.undo();
            }
        });
        control_panel.add(undo);
        
        //Label showing the current time spent on the puzzle
        control_panel.add(timerLabel);
		
        // Put the frame on the screen
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(750, 750);
        frame.setVisible(true);
        
        //Game on! >=)
        court.reset();
	}
	
	/**
     * Main method run to start and run the game. Initializes the GUI elements specified in Game and
     * runs it. IMPORTANT: Do NOT delete! You MUST include this in your final submission.
     */
	public static void main(String[] args) {
        SwingUtilities.invokeLater(new Game());
    }
}