import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from sklearn.metrics import r2_score
from datetime import datetime
from db import dbQuery 

#Galle   district



regr = linear_model.LinearRegression()
def getTemp(month,monthNo):
	query = "SELECT Value,month,Year FROM flood_forcast where month='"+month+"' and District = 'Galle' and Year BETWEEN '2006' AND '2015' order by FIELD(MONTH,'January','February','March','April','May','June','July','August','September','October','November','December')"
	data = dbQuery(query)
	data = np.array(data) 
	data = pd.DataFrame(data) 
	months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
 

	Y = data.ix[:,0]
	Y = np.array(Y)
	Y = Y.astype(np.float64)

 
	X = np.array([(6.0, monthNo),(7.0, monthNo),(8.0, monthNo),(9.0, monthNo),(10.0, monthNo),(11.0, monthNo), (12.0, monthNo), (13.0, monthNo), (14.0, monthNo), (15.0, monthNo)])
	regr.fit(X, Y)

	return regr.predict([(16,monthNo)])

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

 
 
print(y_predict)
print(x_test[:,1])
 
 

# # Plot outputs 
plt.plot(x_test[:,1],y_predict, color='blue', linewidth=3,label="flood")

# plt.xticks(())
# plt.yticks(())
plt.legend()
plt.show() 

