import { useEffect, useState } from 'react';
import ApiManagement from '../../apis/kang-blogging/management';
import { AxiosError } from 'axios';
import { MapErrorResponse } from '../../utils/map_data_response';
import { useDispatch } from 'react-redux';
import { setNotify } from '../../redux/reducers/notify';
import { NotifyType } from '../../interfaces/model/notify';
import Loader from '../../common/Loader';
import { IPolicy } from '../../interfaces/model/policy';

const Policies = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [maxViolation, setMaxViolation] = useState('');
  const [expireWarningTime, setExpireWarningTime] = useState('');
  useEffect(() => {
    ApiManagement.getPolicy()
      .then((rs) => {
        var m = '';
        var expire = '';
        rs.data.data.policies.forEach((e) => {
          if (e.name == 'MaxViolation') {
            m = e.value;
          }
          if (e.name == 'ExpireWarningTime') {
            var temp = parseInt(e.value, 10) / 60;
            expire = temp.toString();
          }
        });
        setMaxViolation(m);
        setExpireWarningTime(expire);
        setIsLoading(false);
      })
      .catch((err) => {
        const e = MapErrorResponse((err as AxiosError).response);
        dispatch(
          setNotify({
            title: 'an error occurred!!',
            description: e.message,
            mustShow: true,
            type: NotifyType.ERROR,
          }),
        );
      });
  }, []);

  const handleChangePolicies = () => {
    if (maxViolation == '' || expireWarningTime == '') {
      dispatch(
        setNotify({
          title: 'an occurred error',
          description: 'missing required fields',
          mustShow: true,
          type: NotifyType.ERROR,
        }),
      );
    } else {
      var time = (parseInt(expireWarningTime) * 60).toString();
      var updateParams: IPolicy[] = [
        { name: 'MaxViolation', value: maxViolation },
        { name: 'ExpireWarningTime', value: time },
      ];
      ApiManagement.updatePolicies({ policies: updateParams })
        .then(() => {
          dispatch(
            setNotify({
              title: 'Updated',
              description: 'successfully',
              mustShow: true,
              type: NotifyType.SUCCESS,
            }),
          );
        })
        .catch((err) => {
          const e = MapErrorResponse((err as AxiosError).response);
          dispatch(
            setNotify({
              title: 'an occurred error',
              description: e.message,
              mustShow: true,
              type: NotifyType.ERROR,
            }),
          );
        });
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div>
        <label>Violation Limit: </label>
        <input
          type="number"
          className="border rounded-r-md rounded-l-md ml-30"
          value={maxViolation}
          onChange={(e) => {
            setMaxViolation(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Warning Time(minutes): </label>
        <input
          type="number"
          className="border rounded-r-md rounded-l-md ml-15"
          value={expireWarningTime}
          onChange={(e) => {
            setExpireWarningTime(e.target.value);
          }}
        />
      </div>
      <div className="ml-20 mt-10">
        <button
          onClick={() => {
            handleChangePolicies();
          }}
          className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-900 text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Policies;
