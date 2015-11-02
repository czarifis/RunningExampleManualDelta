# RunningExampleManualDelta
## Output:


    getMatrix() returns:
     [ { id: 1, product_name: 'apples', zip_code: '92001', value: 5 },
      { id: 2, product_name: 'apples', zip_code: '92092', value: 4 },
      { id: 3, product_name: 'apples', zip_code: '92139', value: 8 },
      { id: 4, product_name: 'oranges', zip_code: '92001', value: 32 },
      { id: 5, product_name: 'oranges', zip_code: '92092', value: 54 },
      { id: 6, product_name: 'oranges', zip_code: '92139', value: 1 },
      { id: 7, product_name: 'avocados', zip_code: '92001', value: 0 },
      { id: 8, product_name: 'avocados', zip_code: '92092', value: 7 },
      { id: 9, product_name: 'avocados', zip_code: '92139', value: 63 } ]
    The template will use the following 2-dimensional array:
     [ [ { id: 1, product_name: 'apples', zip_code: '92001', value: 5 },
        { id: 2, product_name: 'apples', zip_code: '92092', value: 4 },
        { id: 3, product_name: 'apples', zip_code: '92139', value: 8 } ],
      [ { id: 4, product_name: 'oranges', zip_code: '92001', value: 32 },
        { id: 5, product_name: 'oranges', zip_code: '92092', value: 54 },
        { id: 6, product_name: 'oranges', zip_code: '92139', value: 1 } ],
      [ { id: 7, product_name: 'avocados', zip_code: '92001', value: 0 },
        { id: 8, product_name: 'avocados', zip_code: '92092', value: 7 },
        { id: 9, product_name: 'avocados', zip_code: '92139', value: 63 } ] ]
    The incoming diff that comes from the IVM is the following:
     { target: '[3].value', payload: 900 }
    After applying the diff signature we get the following diff:
     { target: '[0].[2].value', payload: 900 }

    Process finished with exit code 0

