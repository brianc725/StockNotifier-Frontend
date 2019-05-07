from flask import Flask, jsonify

app = Flask(__name__)

tickers = [
    {
        'id': u'AAPL',
        'name': u'APPLE INC',
        'price': u'208.48',
    },
    {
        'id': u'MSFT',
        'name': u'Microsoft Corporation',
        'price': u'128.15',
    },
    {
        'id': u'COST',
        'name': u'Costco Wholesale Corporation',
        'price': u'244.23',
    },
    {
        'id': u'BRKA',
        'name': u'Berkshire Hathaway Inc.',
        'price': u'320,000.00',
    },
    {
        'id': u'DAL',
        'name': u'Delta Air lines, Inc.',
        'price': u'57.73',
    },
    {
        'id': u'QCOM',
        'name': u'QUALCOMM Incorporated',
        'price': u'88.25',
    },
    {
        'id': u'SEAS',
        'name': u'SeaWorld Entertainment, Inc.',
        'price': u'26.36',
    },
    {
        'id': u'SYMC',
        'name': u'Symantec Corporation',
        'price': u'23.19',
    },
]

@app.route('/tickers', methods=['GET'])
def get_tasks():
    return jsonify({'tickers': tickers})

if __name__ == '__main__':
    app.run()