from flask import Flask, request, jsonify
import openai
import sqlite3
from flask_cors import CORS
from db import create_connection, create_users_table, add_user, add_form_data

app = Flask(__name__)
CORS(app)

database = "users.db"

openai.api_key = "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"


@app.route('/fetchData', methods=['POST'])
def fetchData():
    conn = sqlite3.connect(database, timeout=30, check_same_thread=False)
    user_data = request.get_json()
    email = user_data['email']

    cur = conn.cursor()
    cur.execute("Select * from users where email=?", (email,))
    user = cur.fetchone()

    if not user:
        conn.close()
        return jsonify(status="error", message="User not found")

    form_data = user[3]

    if form_data is None:
        return jsonify(status="empty_form_data", suggestion="")


    prompt=f"Forget what we talked about before. Your new task is: Those are my conditions: 1) Generate EXACTLY 3 suggestions based on the details below. 2) Your answer consists ONLY of suggestions and nothing more! No title, no 'here is your answer' ONLY suggestions! 3) The suggestions should be written in one line and separated by semicolon EACH! 4) Each suggestion should consist of max. 20 words! 5) Based on the text I provide below, deduct the product name and include it in each suggestion and select !!ONLY THE FOLLOWING!! 3 out of the 4 suggestions I have: Use Incubator Form for generating unique content for [product name], Use Improver Form for optimizing the already existing copyright for [product name], Use Emailer Form for correspondence with clients for [product name] or Use Advisor Form for improving the ad performance for [product name]! This way your answer should be exactly like this: [suggestion 1];[suggestion 2];[suggestion 3], the suggestions are selected from the list above (4 possible suggestions in total). No spaces no new lines no nothing. I need it to hardcode into a programming language. Only 3 suggestions from the 4 I gave you above!. Text: {form_data}"

  
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    suggestion = response.choices[0].text.strip()
    conn.close()
    

    return jsonify(status="success", suggestion=suggestion)




@app.route('/addForm', methods=['POST'])
def addForm():
    conn = sqlite3.connect(database, timeout=30, check_same_thread=False)
    user_data = request.get_json()
    form = user_data['form']
    email = user_data['email']

    add_form_data(conn, email, form)
    cur = conn.cursor()
    cur.execute("Select * from users")
    rows = cur.fetchall()
    users=[]
    for row in rows:
        user = {"id":row[0], "name":row[1], "email":row[2], "form_data":row[3]}
        users.append(user)

    conn.close()
    return jsonify(status="success", users=users)

@app.route('/auth', methods=['POST'])
def auth():
    conn = sqlite3.connect(database, timeout=30, check_same_thread=False)

    if conn is not None:
        create_users_table(conn)
    else:
        return jsonify(status="error", message="Cannot create the database connection.")
    
    user_data = request.get_json()
    name = user_data['name']
    email = user_data['email']
    form_data = None

    cur = conn.cursor()
    cur.execute("Select * from users where email=?", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        user_id = existing_user[0]
    else:
        user_id = add_user(conn, (name, email, form_data))
    
    cur.execute("Select * from users")
    rows = cur.fetchall()
    users=[]
    for row in rows:
        user = {"id":row[0], "name":row[1], "email":row[2], "form_data":row[3]}
        users.append(user)

    conn.close()

    if user_id:
        return jsonify(status="success", user_id=user_id, users=users)
    else:
        return jsonify(status="error")



@app.route("/incubator", methods=["POST"])
def incubator():
    data = request.get_json()

    product = data.get("product", "")
    audience = data.get("audience", "")
    keywords = data.get("keywords", [])
    content_types = data.get("contentTypes", {})
    mood = data.get("mood", "")
    platform = data.get("platform", "")
    

    prompt = f"Help me generate {', '.join([ct for ct, checked in content_types.items() if checked])} for my e-com business. The product is {product}, the target audience is {audience}, and the keywords are {', '.join(keywords)}. "
    
    if mood:
        prompt += f" The mood should be {mood}."
    
    if platform:
        prompt += f" The platform I want to advertise on is {platform}."

    prompt += " Important! Just write your answer without any intro or other details"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    suggestion = response.choices[0].text.strip()

    return jsonify({"suggestion": suggestion})


@app.route("/improver", methods=["POST"])
def improver():
    data = request.get_json()

    selected_option = data.get("selectedOption", "")
    print("printerubtierugheuih")
    text = data.get("text", "")
    mood = data.get("mood", "")
    platform = data.get("platform", "")
    target_audience = data.get("targetAudience", "")
    length = data.get("length", "")
    aspect_ratio = data.get("ratio", "")

    if selected_option == "description":
        prompt = f"Improve the following product description by making it more engaging and appealing to this target audience: {target_audience}. Here is the text: \n\n{text}\n\n"
    else:
        prompt = f"Improve my video ad script: {text}"

    if mood:
        prompt += f"The mood should be {mood}.\n"
    
    if platform:
        prompt += f"The platform should be {platform}.\n"

    if aspect_ratio and selected_option == "ad":
        prompt += f"The aspect ratio I am using for the ad is {aspect_ratio}.\n"

    if length and selected_option == "ad":
        prompt += f"The length of the video should be {length} seconds.\n"


    prompt += " Important! Just write your answer without any intro or other details"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    improved_text = response.choices[0].text.strip()

    return jsonify({"suggestion": improved_text})

@app.route("/emailer", methods=["POST"])
def emailer():
    data = request.get_json()

    customer_email = data.get("customerEmail", "")
    motive = data.get("motive", "")
    other_label = data.get("otherLabel", "")
    other_value = data.get("otherValue", "")
    customer_name = data.get("customerName", "")
    company_name = data.get("companyName", "")
    product_name = data.get("productName", "")

    prompt = f"Compose a professional email for the following context:\n\nCustomer email: {customer_email}\Excuse from our(business) side: {motive}\n{other_label}: {other_value}\n"

    if customer_name:
        prompt += f"Customer name: {customer_name}\n"
    if company_name:
        prompt += f"Company name: {company_name}\n"
    if product_name:
        prompt += f"Product name: {product_name}\n"

    prompt += "Important! Just write your answer without any intro or other details"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    email = response.choices[0].text.strip()

    return jsonify({"suggestion": email})

@app.route("/advisor", methods=["POST"])
def advisor():
    data = request.get_json()

    interests = data.get("interests", [])
    selected_ad = data.get("selectedAd", "")
    video_script = data.get("videoScript", "")
    pixel = data.get("pixel", "")
    budget = data.get("budget", "")
    mood = data.get("mood", "")
    platform = data.get("platform", "")
    length = data.get("length", "")

    prompt = f"Generate ad management suggestions for the following: interests: {', '.join(interests)}, selected ad platform: {selected_ad}, video script: {video_script}, pixel: {pixel}, daily budget: {budget}, video length: {length}."
    
    if mood:
        prompt += f" The mood should be {mood}."
    
    if platform:
        prompt += f" The platform should be {platform}."

    prompt += "Important! Just write your answer without any intro or other details"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    suggestion = response.choices[0].text.strip()

    return jsonify({"suggestion": suggestion})



if __name__ == "__main__":
    app.run(debug=True)
