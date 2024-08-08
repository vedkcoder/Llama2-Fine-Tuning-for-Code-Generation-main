import pandas as pd
from flask import Flask, render_template, request
import llama

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('main.html')

@app.route("/convert.html")
def go_convert():
    return render_template('convert.html')

    
@app.route("/convert", methods=['GET','POST'])
def convert():
    input_text = request.form.get('input_text')
    language = request.form.get('selected_option')
    print(input_text, language)

    output = llama.get_llama_output_lang(input_text, language)
    if input_text == None and language == None:
        result = ''
    else:
        result = output
    return result

@app.route("/main.html")
def home_page():
    return render_template('main.html')

@app.route('/data.html')
def show_data():
    data = pd.read_parquet('curated_train_0000.parquet')
    data = data.to_dict(orient='records')
    return render_template('data.html', data=data)


if __name__ == "__main__":
    app.run()
