import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from datetime import datetime
from db import dbQuery 

#Colombo district

query = "SELECT Value,month,Year FROM rainfall_past where District = 'Colombo' and Year BETWEEN '2006' AND '2014'"
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
    data.ix[i,4] = pd.to_datetime(data.ix[i,3])
    data.ix[i,4] = pd.to_datetime(data.ix[i,4].year*10000+data.ix[i,4].month *
                          100+data.ix[i,4].day, format='%Y%m%d') 
Y = data.ix[:,0]
Y = np.array(Y)
Y = Y.astype(np.float64)
X = data.ix[:,4]
X = np.array(X,np.int64)
X = X.reshape((X.shape[0],1))
#x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)

x_train = X
y_train = Y

num = ["01","02","03","04","05","06","07","08","09","10","11","12"]
array1 = []
for i in num :
    
    data.ix[i,5] = "2016-"+i+"-01"
    print(data.ix[i,5])
    data.ix[i,5] = pd.to_datetime(data.ix[i,5])
    data.ix[i,5] = pd.to_datetime(data.ix[i,5].year*10000+data.ix[i,5].month *
                          100+data.ix[i,5].day, format='%Y%m%d')
    array1.append(data.ix[i,5])

print(array1)
x_test = array1
x_test = np.array(x_test,np.int64)
x_test = x_test.reshape((x_test.shape[0],1))



regr = linear_model.LinearRegression()
# Train the model using the training sets
regr.fit(x_train, y_train)
y_test = regr.predict(x_test)
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

