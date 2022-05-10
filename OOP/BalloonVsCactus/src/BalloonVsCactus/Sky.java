package BalloonVsCactus;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class Sky {

    private BufferedImage SkyImage;

    private int x1,y1,x2,y2;
    public int y3 = 100;

    public Sky() {
        try {
            SkyImage = ImageIO.read(new File("Assets/sky.png"));
        } catch (IOException ex) {} 

        x1 = 0;
        y1 = 0;
        x2 = x1+830;
        y2 = 0;
    }

    public void Update() {
        x1-=2;
        x2-=2;
        if(x2<0) x1 = x2 +830;
        if(x1<0) x2 = x1 +830;
    }

    public void Paint(Graphics2D g2) { 
        g2.drawImage(SkyImage, x1, y1, null);
        g2.drawImage(SkyImage, x2, y2, null);
    }

    public int getYSky() {
        return y3;
    }
}