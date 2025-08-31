result = None

try:
    data = request.json.get('data')
    if not data:
        result = {"error": "No data provided"}, 400
    else:
        img = qrcode.make(data)
        buffer = BytesIO()
        img.save(buffer, "PNG")
        buffer.seek(0)
        result = send_file(buffer, mimetype='image/png')
except Exception as e:
    result = {"error": str(e)}, 500
