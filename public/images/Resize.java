import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Utilitaire de redimensionnement d'images PNG en masse pour les assets d'application.
 * <p>
 * Cet utilitaire scanne le dossier courant, redimensionne toutes les images {@code .png} 
 * vers une hauteur cible fixe tout en conservant le ratio d'aspect initial, puis génère 
 * directement dans la console le code TypeScript associé au type {@code SrcImage}.
 * </p>
 *
 * @author Phalenopsis
 * @version 1.0
 */
public class Resize {

    /**
     * Hauteur cible (en pixels) appliquée à toutes les images redimensionnées.
     */
    private static final int TARGET_HEIGHT = 350;

    /**
     * Point d'entrée principal du programme.
     * <p>
     * Recherche tous les fichiers {@code .png} situés dans le répertoire d'exécution 
     * courant et applique le traitement de redimensionnement à chacun d'eux.
     * </p>
     *
     * @param args arguments de la ligne de commande (non utilisés)
     */
    public static void main(String[] args) {
        File dir = new File(".");

        File[] files = dir.listFiles((d, name) ->
                name.toLowerCase().endsWith(".png"));

        if (files == null) {
            System.err.println("Aucun fichier PNG trouvé.");
            return;
        }

        for (File file : files) {
            try {
                resizeImage(file);
            } catch (IOException e) {
                System.err.println("✖ Erreur avec " + file.getName());
                e.printStackTrace();
            }
        }
    }

    /**
     * Redimensionne une image PNG source, l'enregistre sur le disque et affiche la déclaration TypeScript.
     * <p>
     * L'image est redimensionnée en conservant son ratio grâce à une interpolation bicubique
     * avec anti-aliasing pour maximiser la qualité du rendu. Un nouveau fichier préfixé par 
     * {@code "resized_"} est sauvegardé dans le répertoire courant.
     * </p>
     * <p>
     * À la fin du traitement, la méthode affiche dans la sortie standard le bloc de code
     * TypeScript au format :
     * <pre>
     * export const myImage: SrcImage = {
     *   name: "MyImage",
     *   fileName: "resized_myImage.png",
     *   src: "folder/resized_myImage.png",
     *   width: 450,
     *   height: 350
     * };
     * </pre>
     * </p>
     *
     * @param inputFile le fichier image PNG à traiter
     * @throws IOException si une erreur survient lors de la lecture de l'image source 
     *                     ou de l'écriture du fichier de sortie
     */
    private static void resizeImage(File inputFile) throws IOException {
        BufferedImage original = ImageIO.read(inputFile);

        int originalWidth = original.getWidth();
        int originalHeight = original.getHeight();
        String name = inputFile.getName().substring(0, inputFile.getName().length() - 4);

        String dirName;

        File parentDir = inputFile.getParentFile();
        if (parentDir == null || parentDir.getName().equals(".")) {
            dirName = new File(".").getCanonicalFile().getName();
        } else {
            dirName = parentDir.getName();
        }

        String src = dirName.isEmpty() ? inputFile.getName() : dirName + "/resized_" + inputFile.getName();

        double scale = (double) TARGET_HEIGHT / originalHeight;
        int newWidth = (int) Math.round(originalWidth * scale);

        BufferedImage resized = new BufferedImage(
                newWidth,
                TARGET_HEIGHT,
                BufferedImage.TYPE_INT_ARGB
        );

        Graphics2D g = resized.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g.drawImage(original, 0, 0, newWidth, TARGET_HEIGHT, null);
        g.dispose();

        File output = new File("resized_" + inputFile.getName());
        ImageIO.write(resized, "png", output);

        System.out.println("export const " + name + ": SrcImage = {");
        System.out.println("  name : \"" + name.substring(0, 1).toUpperCase() + name.substring(1) + "\",");
        System.out.println("  fileName : \"" + output.getName() + "\",");
        System.out.println("  src : \"" + src + "\",");
        System.out.println("  width : " + newWidth + ",");
        System.out.println("  height : " + TARGET_HEIGHT);
        System.out.println("};");
    }
}