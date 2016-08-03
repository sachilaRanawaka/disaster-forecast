import pandas as pd
import sklearn.linear_model as ll
import numpy as np
import matplotlib.pyplot as plt
from db import dbQuery 

#Colombo district

query = "SELECT Value,month,Year FROM rainfall_past where District = 'Colombo' and Year BETWEEN '2006' AND '2015'"
data = dbQuery(query)
data = np.array(data)
data = pd.DataFrame(data) 
X = data.ix[:,1:3]
y = data.ix[:,0] 

month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

for i, m in enumerate(data.ix[:,1]):
    data.ix[i,1] = month.index(m)

X = data.ix[:,1:3]
lr = ll.LinearRegression()

lr.fit(X, y)

######### TEST DATA ##########
X_test = [[1, 2016], [2, 2016], [3, 2016], [4, 2016], [5, 2016], [6, 2016], [7, 2016], [8, 2016], [9, 2016], [10, 2016], [11, 2016], [12, 2016]]
X_test1 = [1,2,3,4,5,6,7,8,9,10,11,12]
X_test = pd.DataFrame(X_test, columns=['Month', 'Year'])

y_test = lr.predict(X_test) 
y_test = np.array(y_test)
print(y_test)
p = np.array([[]])
for i in y_test:
    p = np.append(p, [[i]], 0)
    print(p)

print(p)
X_test1 = np.array(X_test1)  


plt.scatter(X_test1, y_test,  color='black')
plt.plot(X_test1, lr.predict(X_test1), color='blue',
         linewidth=3)

plt.xticks(())
plt.yticks(())

plt.show()
 
