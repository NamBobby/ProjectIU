 package BalloonVsCactus;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;

import framework.QueueList;

public class CactusGroup {
	
	private QueueList<Cactus> cactus;
	private BufferedImage cactusImage, cactusImage2;
	
	public static int SIZE = 6;
	
	private int topCactusY = -350; 
	private int bottomCactusY = 190; 
	
	public Cactus getCactus(int i) {
		return cactus.get(i);
	}

	public int getRandomY() {
		Random random = new Random();
		int a;
		a = random.nextInt(10);
		
		return a*35;
	}
	
	public CactusGroup() {
		
		try {
			
			cactusImage = ImageIO.read(new File("Assets/catus1.png"));
			cactusImage2 = ImageIO.read(new File("Assets/catus2.png"));
			
		} catch (IOException ex)  {}
		
		cactus = new QueueList<Cactus>();
		
		Cactus cn;
		
		for(int i = 0; i < SIZE/2 ; i++) {
			
			int deltaY = getRandomY();
			
			cn = new Cactus(830+i*300, bottomCactusY + deltaY, 80, 100);
			cactus.push(cn);
			
			cn = new Cactus(830+i*300, topCactusY + deltaY, 80, 100);
			cactus.push(cn);

		}
	}
	
	public void resetCactus() {
		cactus = new QueueList<Cactus>();
		
		Cactus cn;
		
		for(int i = 0; i < SIZE/2 ; i++) {
			
			int deltaY = getRandomY();
			
			cn = new Cactus(830+i*300, bottomCactusY + deltaY, 74, 400);
			cactus.push(cn);
			
			cn = new Cactus(830+i*300, topCactusY + deltaY, 74, 400);
			cactus.push(cn);

		}
	}
	
	public void update() {
		for(int i = 0; i < SIZE; i++) {
			cactus.get(i).update();
		}
		if(cactus.get(0).getPosX() < -74 ) {
			
			int deltaY = getRandomY();
			
			Cactus cn;
			cn = cactus.pop();
			cn.setPosX(cactus.get(4).getPosX()+300);
			cn.setPosY(bottomCactusY + deltaY);
			cn.setIsBehindBalloon(false);
			cactus.push(cn);

			cn = cactus.pop();
			cn.setPosX(cactus.get(4).getPosX());
			cn.setPosY(deltaY);
			cn.setPosY(topCactusY + deltaY);
			cn.setIsBehindBalloon(false);
			cactus.push(cn);
		}
	}
	public void paint(Graphics2D g2) {
		for(int i = 0; i < 6; i++) 
			if(i%2==0)
				g2.drawImage(cactusImage, (int) cactus.get(i).getPosX(), (int) cactus.get(i).getPosY(), null);
			else g2.drawImage(cactusImage2, (int) cactus.get(i).getPosX(), (int) cactus.get(i).getPosY(), null);
		}
	}
	

