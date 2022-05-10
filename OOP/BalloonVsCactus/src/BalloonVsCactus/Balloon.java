package BalloonVsCactus;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.awt.Font;
import javax.imageio.ImageIO;

import framework.AFrameOnImage;
import framework.GameScreen;

public class Balloon extends GameScreen {
	
	
	private static final long serialVersionUID = 1L;
	private BufferedImage ballon;
	
	private framework.Animation balloon_anim;	
	
	public static float g = 0.1f;
	
	private Loon balloon;
	private CactusGroup cactusGroup;
	
	private int Point = 0;
	
	private Ground ground;
	private Sky sky;
	
	private int BEGIN_SCREEN = 0;
	private int GAMEPLAY_SCREEN = 1;
	private int GAMEOVER_SCREEN = 2;
	
	private int CurrentScreen = BEGIN_SCREEN;
	
	public Balloon() {
				
		super(800,600);
		
		try {
			ballon = ImageIO.read(new File("Assets/rsz_ballon (1).png"));
			
			
		} catch (IOException ex)  {}
		
		balloon_anim = new framework.Animation(70);
		AFrameOnImage f;
		f= new AFrameOnImage(0, 0, 53,70);
		balloon_anim.AddFrame(f);
		f= new AFrameOnImage(58, 0, 53,70);
		balloon_anim.AddFrame(f);
		f= new AFrameOnImage(115, 0, 53,70);
		balloon_anim.AddFrame(f);			
		f= new AFrameOnImage(58, 0, 53,70);
		balloon_anim.AddFrame(f);		
		
		balloon = new Loon(350, 250, 50, 50);
		ground = new Ground();
		sky = new Sky();
		cactusGroup = new CactusGroup();
		
		BeginGame();
	}
	public static void main(String[] args) {
		new Balloon();
	}
	
	private void resetGame() {
		balloon.setPos(350, 250);
		balloon.setVt(0);
		balloon.setLive(true);
		Point = 0;
		cactusGroup.resetCactus();
	}
	
	@Override
    public void GAME_UPDATE(long deltaTime) {

        if(CurrentScreen == BEGIN_SCREEN) {
            resetGame();
        }else if(CurrentScreen == GAMEPLAY_SCREEN) {

            if(balloon.getLive()) balloon_anim.Update_Me(deltaTime);
            balloon.update(deltaTime);
            ground.Update();
            sky.Update();
      

            cactusGroup.update();

            for(int i = 0; i<CactusGroup.SIZE;i++) {
                if(balloon.getRect().intersects(cactusGroup.getCactus(i).getRect())) {
                    if(balloon.getLive()) {
                        CurrentScreen = GAMEOVER_SCREEN;
                        balloon.bupSound.play();
                    }
                    balloon.setLive(false);
                    System.out.println("Set live = false");
            }
            }

            for(int i = 0; i<CactusGroup.SIZE;i++) {
                if(balloon.getPosX() > cactusGroup.getCactus(i).getPosX() && !cactusGroup.getCactus(i).getIsBehindBird() && i%2==0) {
                    Point++;
                    balloon.getMoneySound.play();
                    cactusGroup.getCactus(i).setIsBehindBalloon(true);
                }
            }

            if(balloon.getPosY() + balloon.getH() >= ground.getYGround()) {
                CurrentScreen = GAMEOVER_SCREEN;
                balloon.bupSound.play();
        }    if(balloon.getPosY() + balloon.getH() <= sky.getYSky()) {
                CurrentScreen = GAMEOVER_SCREEN;
                balloon.bupSound.play();}
        }else {}
    }

	@Override
	public void GAME_PAINT(Graphics2D g2) {
		Font normalfont = new Font("DeluxeFont Regular", Font.BOLD, 40);
		Font normalfont1 = new Font("DeluxeFont Regular", Font.BOLD, 15);
		g2.setColor(Color.decode("#b8daef"));
		g2.fillRect(0, 0, MASTER_WIDTH, MASTER_HEIGHT);
		
		cactusGroup.paint(g2);

		ground.Paint(g2);
		sky.Paint(g2);
		
		
		if(balloon.getIsFlying())
		balloon_anim.PaintAnims((int) balloon.getPosX(), (int) balloon.getPosY(), ballon, g2, 0,0);
		else 
		balloon_anim.PaintAnims((int) balloon.getPosX(), (int) balloon.getPosY(), ballon, g2, 0,0);
	
		
		if(CurrentScreen == BEGIN_SCREEN) {
			g2.setColor(Color.DARK_GRAY);
			g2.fillRect(320, 250, 140, 60);
			g2.setColor(Color.GREEN);
			g2.setFont(normalfont);
			g2.drawString("START", 324, 300);
		}
		
		if(CurrentScreen == GAMEOVER_SCREEN) {
			g2.setColor(Color.DARK_GRAY);
			g2.fillRect(310, 250, 242, 60);
			g2.setColor(Color.GREEN);
			g2.setFont(normalfont);
			g2.drawString("REPLAY", 312, 300);
		}
		g2.setColor(Color.black);
		g2.setFont(normalfont1);
		g2.drawString("Point: "+ Point, 20, 570);
		
		
	}
	
	
	
	@Override
	public void KEY_ACTION(KeyEvent e, int Event) {
	
	if(Event == KEY_PRESSED) {
		
		if(CurrentScreen == BEGIN_SCREEN) {
			CurrentScreen = GAMEPLAY_SCREEN;
			
		}else if(CurrentScreen == GAMEPLAY_SCREEN) {
			if(balloon.getLive()) balloon.fly();
			
		}else if(CurrentScreen == GAMEOVER_SCREEN) {
			CurrentScreen = BEGIN_SCREEN;
		}
		}
		
	}
}


