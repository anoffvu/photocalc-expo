from flask import Flask, request, send_file, jsonify
from PIL import Image
import io
import base64


app = Flask(__name__)


@app.route('/combine', methods=['POST'])
def combine_images():
    image1 = Image.open(request.files['image1'])
    image2 = Image.open(request.files['image2'])

    # Combine the images in some way. This example just pastes image2 onto image1.
    image1.paste(image2, (0, 0))

    # Save the combined image to a file.
    combined_image_path = io.BytesIO()
    image1.save(combined_image_path, format='jpeg')

    # Return the combined image file.
    # return send_file(combined_image_path, mimetype='image/jpeg')
    return jsonify({'image': base64.b64encode(combined_image_path.getvalue()).decode('utf-8')})


if __name__ == '__main__':
    app.run(debug=True)
