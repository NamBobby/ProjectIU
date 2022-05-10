package BalloonVsCactus;

import java.awt.Rectangle;

import framework.Objects;

public class Cactus extends Objects {
	
	private Rectangle rect;
	
	private boolean isBehindBalloon = false;
	
	public Cactus(int x, int y, int w, int h) {
		super(x, y, w, h);
		rect = new Rectangle(x, y, w, h);

	}
	public void update() {
		setPosX(getPosX()-2);
		this.rect.setLocation((int) this.getPosX(), (int) this.getPosY());

	}
	
	public Rectangle getRect() {
		return rect;
	}
	public boolean getIsBehindBird() {
		return isBehindBalloon;
	}
	public void setIsBehindBalloon(boolean b) {
		isBehindBalloon = b;
	}
	
}
