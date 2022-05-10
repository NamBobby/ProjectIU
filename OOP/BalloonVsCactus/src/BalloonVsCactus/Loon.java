package BalloonVsCactus;

import java.awt.Rectangle;
import java.io.File;

import framework.Objects;
import framework.SoundPlayer;

public class Loon extends Objects{
	
	private float vt = 0;
	
	private boolean isFlying = false;
	
	private Rectangle rect;
	
	private boolean isLive = true;
	
	public SoundPlayer flapSound, bupSound, getMoneySound;
	
	public Loon(int x, int y, int w , int h) {
		super(x, y, w, h);
		rect = new Rectangle(x, y, w, h);
		
		flapSound = new SoundPlayer(new File("Assets/flap.wav"));
		bupSound = new SoundPlayer(new File("Assets/Balloon popping _ burst _ blast (3D77618-WSB).wav"));
		getMoneySound = new SoundPlayer(new File("Assets/getmoney.wav"));
		
	}
	
	public void setLive(boolean b) {
		isLive = b;
	}
	
	public boolean getLive() {
		return isLive;
	}
	
	public Rectangle getRect() {
		return rect;
	}
	
	public void setVt(float vt) {
		this.vt = vt;
	}
	
	public void update(long deltaTime) {
		
		vt-=Balloon.g;
		
		this.setPosY(this.getPosY()+vt);
		this.rect.setLocation((int) this.getPosX(), (int) this.getPosY());
		
		if(vt > 0) isFlying = true;
		else isFlying = false;
		
	}
	
	public void fly() {
		vt = +3;
		flapSound.play();
	}
	
	public boolean getIsFlying() {
		return isFlying;
	}
	
}
