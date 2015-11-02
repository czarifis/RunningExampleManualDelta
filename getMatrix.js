/**
 * Created by Costas Zarifis on 10/30/15.
 */


var data_from_server = [
    {
        id: 1,
        product_name: 'apples',
        zip_code: '92001',
        value: 5
    },
    {
        id: 2,
        product_name: 'apples',
        zip_code: '92092',
        value: 4
    },
    {
        id: 3,
        product_name: 'apples',
        zip_code: '92139',
        value: 8
    },
    {
        id: 4,
        product_name: 'oranges',
        zip_code: '92001',
        value: 32
    },
    {
        id: 5,
        product_name: 'oranges',
        zip_code: '92092',
        value: 54
    },
    {
        id: 6,
        product_name: 'oranges',
        zip_code: '92139',
        value: 1
    },
    {
        id: 7,
        product_name: 'avocados',
        zip_code: '92001',
        value: 0
    },
    {
        id: 8,
        product_name: 'avocados',
        zip_code: '92092',
        value: 7
    },
    {
        id: 9,
        product_name: 'avocados',
        zip_code: '92139',
        value: 63
    }
];

// The index that will be used by the delta function
var index = {};

/**
 * The group by function
 * @param input                     - The "flat" input
 * @param input_key                 - The element (of the input data) that will be used as the primary key.
 *                                    The target of the incoming diff will be using this to identify the correct tuple
 * @param group_key                 - The attribute that will be used for the group by
 * @param key_of_second_dimension   - The 2nd group by attribute.
 * @returns {Array}                 - The 2-dimensional array.
 */
function groupBy(input, input_key, group_key, key_of_second_dimension) {
    var hash = {};
    for (var i=0 ; i < input.length; i++) {
        if (hash[input[i][group_key]] === undefined) {
            hash[input[i][group_key]] = [];
        }
        hash[input[i][group_key]].push(input[i]);
        var index_key;
        if (input_key===undefined){
            // I'm assuming that ordinal position is used as a key
            index_key = i;
        }
        else{
            // The key on the input data is defined (is not the ordinal position)
            index_key = input[i][input_key]
        }
        //index[i] = input[i][{group_key:undefined, size :undefined}];
        if (index[index_key] === undefined) {
            index[index_key] = {}
        }
        //index[i][group_key] = input[i][group_key];
        for (var j = 0 ; j<key_of_second_dimension.length;j++) {
            index[index_key].index2 = hash[input[i][group_key]].length-1;
            index[index_key].index1 = input[i][group_key];
        }
    }

    //console.log('hash:',hash,'\nindex:', index);

    var returned_array = [];
    for (var k in hash){
        //console.log('sup\n', k, hash);
        returned_array.push(hash[k]);
        for (var l in index) {
            if (index[l].index1 === k){
                index[l].index1 = returned_array.length-1;
            }
        }
    }
    //console.log('final array', returned_array);
    //console.log('final index', index);
    return returned_array;
}

function delta_groupBy(diff){
    var steps = diff.target.replace('[','').replace(']','').split('.');
    var indexed = index[steps[0]];
    //console.log(pm[indexed.index1][indexed.index2][steps[1]]);
    var produced_diff = {'target': '['+indexed.index1+']'+'.['+indexed.index2+'].'+steps[1], 'payload':diff.payload};
    return produced_diff
}

console.log('getMatrix() returns:\n',data_from_server);
var pm = groupBy(data_from_server,'id', 'product_name', ['zip_code']);

console.log('The template will use the following 2-dimensional array:\n', pm);

var diff = {'target': '[3].value', 'payload':900};

console.log('The incoming diff that comes from the IVM is the following:\n', diff);

var pm_diff = delta_groupBy(diff);
console.log('After applying the diff signature we get the following diff:\n', pm_diff);