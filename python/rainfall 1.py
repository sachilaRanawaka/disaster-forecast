import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from datetime import datetime
from db import dbQuery 

#Colombo district

query = "SELECT Value,month,Year FROM rainfall_past where District = 'Colombo' and Year BETWEEN '2006' AND '2010'"
data = dbQuery(query)
data = np.array(data) 
data = pd.DataFrame(data) 
month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

for i, m in enumerate(data.ix[:,1]):
    if(len(str(month.index(m)+1)) == 1):
        stringData = "0" + str(month.index(m)+1) 
    else:
        stringData = str(month.index(m)+1)
        
    data.ix[i,3] = data.ix[i,2] +"-"+ stringData +"-01"
    data.ix[i,3] = pd.to_datetime(data.ix[i,3])
data.loc[:, 3] = data.loc[:, 3].apply(lambda x: x.toordinal())

Y = data.ix[:,0]
Y = np.array(Y)
Y = Y.astype(np.float64)
X = data.ix[:,3]
X = np.array(X,np.int64)
X = X.reshape((X.shape[0],1))
# print(X)

# x_train = X.reshape((X.shape[0],1))
# y_train = Y.astype(np.float64)
# sample = []
# sample = np.array(sample)
# sample = pd.DataFrame(sample) 
# print(sample)

# num = ["01","02","03","04","05","06","07","08","09","10","11","12"]  
# for i in num :
    
#     sample.ix[i,0] = pd.to_datetime("2016-"+i+"-01")
#     print(sample.ix[i,0])

# sample.loc[:, 0] = sample.loc[:, 0].apply(lambda x: x.toordinal())
# x_test = sample.loc[:, 0]
# x_test = np.array(x_test,np.int64)
# x_test = x_test.reshape((x_test.shape[0],1))




# y_test = regr.predict(x_test)
# print(y_test)
x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

regr = linear_model.LinearRegression()
regr.fit(x_train, y_train)
print(regr.predict(x_test))
print('Coefficients: \n', regr.coef_)

# The mean square error
print("Residual sum of squares: %.2f" % np.mean((regr.predict(x_test) - y_test) ** 2))

# Explained variance score: 1 is perfect prediction
print('Variance score: %.2f' % regr.score(x_test, y_test))

# Plot outputs
plt.scatter(x_test, y_test,  color='black')
plt.plot(x_test, regr.predict(x_test), color='blue', linewidth=3)

plt.xticks(())
plt.yticks(())

plt.show()

print(regr.predict(x_test))

