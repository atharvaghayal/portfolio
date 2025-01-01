from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Generate the secret sequence (0-8 digit number padded with zeros)
SECRET = str(random.randint(0, 99999999)).zfill(8)
ATTEMPTS = 6
attempts_left = ATTEMPTS

@app.route('/guess', methods=['POST'])
def handle_guess():
    global attempts_left
    data = request.json
    guess = data.get('guess', '')

    if len(guess) != len(SECRET):
        return jsonify({"feedback": "Your guess must be 8 digits long."}), 400

    if attempts_left <= 0:
        return jsonify({"feedback": "No attempts left! The number was " + SECRET + "."}), 200

    # Compare guess with the secret
    feedback = []
    for i in range(len(SECRET)):
        if guess[i] == SECRET[i]:
            feedback.append("🟩")  # Correct position
        elif guess[i] in SECRET:
            feedback.append("🟨")  # Correct digit, wrong position
        else:
            feedback.append("⬜")  # Incorrect digit

    attempts_left -= 1

    if guess == SECRET:
        return jsonify({"feedback": "Congratulations! You guessed the number: " + SECRET}), 200
    elif attempts_left == 0:
        return jsonify({"feedback": "No attempts left! The number was " + SECRET + "."}), 200
    else:
        return jsonify({
            "feedback": f"{' '.join(feedback)}<br>Attempts left: {attempts_left}"
        })

if __name__ == '__main__':
    app.run(debug=True)
