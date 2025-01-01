import spark.Request;
import spark.Response;
import spark.Spark;
import java.util.Random;

public class UntangleNumbersGame {
    private static final String SECRET = String.format("%08d", new Random().nextInt(100000000));
    private static int attemptsLeft = 6;

    public static void main(String[] args) {
        Spark.post("/guess", (Request req, Response res) -> {
            String guess = req.queryParams("guess");
            if (guess.length() != SECRET.length()) {
                res.status(400);
                return "{\"feedback\":\"Your guess must be 8 digits long.\"}";
            }

            if (attemptsLeft <= 0) {
                return "{\"feedback\":\"No attempts left! The number was " + SECRET + ".\"}";
            }

            StringBuilder feedback = new StringBuilder();
            for (int i = 0; i < SECRET.length(); i++) {
                if (guess.charAt(i) == SECRET.charAt(i)) {
                    feedback.append("🟩");
                } else if (SECRET.contains(String.valueOf(guess.charAt(i)))) {
                    feedback.append("🟨");
                } else {
                    feedback.append("⬜");
                }
            }

            attemptsLeft--;
            if (guess.equals(SECRET)) {
                return "{\"feedback\":\"Congratulations! You guessed the number: " + SECRET + "\"}";
            } else if (attemptsLeft == 0) {
                return "{\"feedback\":\"No attempts left! The number was " + SECRET + ".\"}";
            } else {
                return "{\"feedback\":\"" + feedback.toString() + "<br>Attempts left: " + attemptsLeft + "\"}";
            }
        });
    }
}
