import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from sklearn.metrics import r2_score
from datetime import datetime
from db import dbQuery 

#Badulla district



regr = linear_model.LinearRegression()
def getTemp(month,monthNo):
	query = "SELECT Value,month,Year FROM tempurature_past where month='"+month+"' and District = 'Bandarawela' and Year BETWEEN '2010' AND '2013'"
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

	X = np.array([(10.0, monthNo),(11.0, monthNo), (12.0, monthNo), (13.0, monthNo)])
	regr.fit(X, Y)

	return regr.predict([(14,monthNo)])

# def predicRainfal(month,monthNo):
# 	query = "SELECT Value,month,Year FROM rainfall_past where month='"+month+"' and District = 'Colombo' and Year BETWEEN '2006' AND '2013'"
# 	data = dbQuery(query)
# 	data = np.array(data) 
# 	data = pd.DataFrame(data)  
# 	month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

# 	for i, m in enumerate(data.ix[:,1]):
# 	    if(len(str(month.index(m)+1)) == 1):
# 	        stringData = "0" + str(month.index(m)+1) 
# 	    else:
# 	        stringData = str(month.index(m)+1)
	        
# 	    data.ix[i,3] = data.ix[i,2] +"-"+ stringData +"-01"
# 	    data.ix[i,3] = pd.to_datetime(data.ix[i,3])
# 	data.loc[:, 3] = data.loc[:, 3].apply(lambda x: x.toordinal())

# 	Y = data.ix[:,0]
# 	Y = np.array(Y)
# 	Y = Y.astype(np.float64)

# 	X = np.array([(6.0, monthNo),  (7.0, monthNo),  (8.0, monthNo),(9.0, monthNo),(10.0, monthNo),(11.0, monthNo), (12.0, monthNo), (13.0, monthNo)])
# 	regr.fit(X, Y)

# 	return regr.predict([(14,monthNo)])
 

# y_predict = [];
# y_predict.append(predicRainfal("January",1.0))
# y_predict.append(predicRainfal("February",2.0))
# y_predict.append(predicRainfal("March",3.0))
# y_predict.append(predicRainfal("April",4.0))
# y_predict.append(predicRainfal("May",5.0))
# y_predict.append(predicRainfal("June",6.0))
# y_predict.append(predicRainfal("July",7.0))
# y_predict.append(predicRainfal("August",8.0))
# y_predict.append(predicRainfal("September",9.0))
# y_predict.append(predicRainfal("October",10.0))
# y_predict.append(predicRainfal("November",11.0))
# y_predict.append(predicRainfal("December",12.0))


y_predict = [];
y_predict.append(getTemp("January",1.0))
y_predict.append(getTemp("February",2.0))
y_predict.append(getTemp("March",3.0))
y_predict.append(getTemp("April",4.0))
y_predict.append(getTemp("May",5.0))
y_predict.append(getTemp("June",6.0))
y_predict.append(getTemp("July",7.0))
y_predict.append(getTemp("August",8.0))
y_predict.append(getTemp("September",9.0))
y_predict.append(getTemp("October",10.0))
y_predict.append(getTemp("November",11.0))
y_predict.append(getTemp("December",12.0))

y_predict = np.array(y_predict)
y_predict = y_predict.ravel() 

x_test = np.array([(14.0, 1.0),(14.0, 2.0),(14.0, 3.0),(14.0, 4.0),(14.0, 5.0),(14.0, 6.0),(14.0, 7.0),(14.0, 8.0),(14.0, 9.0),(14.0, 10.0),(14.0, 11.0),(14.0, 12.0)])


query = "SELECT Value,month FROM tempurature_past where District = 'Bandarawela' and Year = '2014'"
testDB = dbQuery(query)
testDB = np.array(testDB) 
testDB = pd.DataFrame(testDB)
month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
for i, m in enumerate(testDB.ix[:,1]):
	testDB.ix[i,2] = int(month.index(m) +1)

# testDB[:,2] = testDB[:,2].astype(int)

testDB = testDB.sort_values(testDB.columns[2])
# testDB = testDB.sort(testDB.ix[i,2], ascending=False)

# print(testDB.sort_values(testDB.columns[2]))
# print(testDB)

y_test= testDB.ix[:,0]
y_test = np.array(y_test)
y_test= y_test.astype(np.float64)
print(y_test)
print(y_predict)

print('r value ',r2_score(y_test, y_predict))

 
#print('Coefficients: \n', regr.coef_)

# The mean square error
print("Residual sum of squares: %.2f" % np.mean((y_predict - y_test) ** 2))

# Explained variance score: 1 is perfect prediction
# print('Variance score: %.2f' % regr.score(y_test, y_predict))

# # Plot outputs
plt.scatter(x_test[:,1], y_test,  color='black')
plt.plot(x_test[:,1],y_predict, color='blue', linewidth=3,label="temparature")

# plt.xticks(())
# plt.yticks(())
plt.legend()
plt.show() 

