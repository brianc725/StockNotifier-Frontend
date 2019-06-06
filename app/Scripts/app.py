from flask import Flask, jsonify

app = Flask(__name__)

tickers = [
    {
        'id': u'AAPL',
        'name': u'APPLE INC',
        'price': u'208.48',
        'support': u'200.00',
        'support_strength': u'10',
        'resistance': u'221.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'MSFT',
        'name': u'Microsoft Corporation',
        'price': u'128.15',
        'support': u'120.00',
        'support_strength': u'10',
        'resistance': u'141.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'COST',
        'name': u'Costco Wholesale Corporation',
        'price': u'244.23',
        'support': u'223.00',
        'support_strength': u'10',
        'resistance': u'250.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'BRKA',
        'name': u'Berkshire Hathaway Inc.',
        'price': u'320,000.00',
        'support': u'318,925.00',
        'support_strength': u'10',
        'resistance': u'334,000.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'DAL',
        'name': u'Delta Air Lines, Inc.',
        'price': u'57.73',
        'support': u'55.00',
        'support_strength': u'10',
        'resistance': u'62.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'QCOM',
        'name': u'QUALCOMM Incorporated',
        'price': u'88.25',
        'support': u'85.00',
        'support_strength': u'10',
        'resistance': u'99.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'SEAS',
        'name': u'SeaWorld Entertainment, Inc.',
        'price': u'26.36',
        'support': u'19.00',
        'support_strength': u'10',
        'resistance': u'29.33',
        'resistance_strength': u'8',
    },
    {
        'id': u'SYMC',
        'name': u'Symantec Corporation',
        'price': u'23.19',
        'support': u'22.00',
        'support_strength': u'10',
        'resistance': u'23.33',
        'resistance_strength': u'8',
    },
]

nyse = [
    {
        'id': u'AAPL',
        'name': u'APPLE INC',
    },
    {
        'id': u'MSFT',
        'name': u'Microsoft Corporation',
    },
    {
        'id': u'LB',
        'name': u'L Brands, Inc.',
    },
    {
        'id': u'UBER',
        'name': u'Uber Technologies, Inc.',
    },
    {
        'id': u'FB',
        'name': u'Facebook, Inc.',
    },
    {
        'id': u'TWTR',
        'name': u'Twitter, Inc.',
    },
    {
        'id': u'HD',
        'name': u'The Home Depot, Inc.',
    },
    {
        'id': u'MGM',
        'name': u'MGM Resorts International',
    },
]

@app.route('/tickers', methods=['GET'])
def get_tickers():
    return jsonify({'tickers': tickers})

@app.route('/nyse', methods=['GET'])
def all_nyse():
    return jsonify({'nyse': nyse})    

if __name__ == '__main__':
    app.run()